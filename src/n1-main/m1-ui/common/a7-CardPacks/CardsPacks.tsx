import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    addPackofCardsTC,
    CardsPacksReducerType,
    fetchPackCardsTC,
    getUsersPacksTC,
    removePackOfCardsTC,
    updateNamePackOfCardsTC
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import {PackOfCards} from "./a7-1 PackOfCards/PackOfCards";
import {Modal} from "./Modal/Modal";
import classes from './../a7-CardPacks/CardsPacks.module.css'
import {Paginator} from "./Paginator/Paginator";
import {Box, Slider} from "@mui/material";
import {useDebounce, useUpdateEffect} from "usehooks-ts";
import {SearchPacks} from "../c6-SearchPacks/SearchPacks";




function SearchCards() {
    return null;
}

export const CardsPacks = () => {
    const error = useSelector<RootReducerType, string | null>(state => state.cardsPacks.error)
    const {
        pageCount,
        page,
        cardPacksTotalCount,
        cardsPacks,
        currentPackName,
    } = useSelector<RootReducerType, CardsPacksReducerType>(state => state.cardsPacks)

    const dispatch = useDispatch()

    const [isOpened, setOpened] = useState<boolean>(false)
    const [value, setValue] = useState([0, 30]);
    const debouncedValue = useDebounce<number[]>(value, 1000)

    useEffect(() => {
        dispatch(fetchPackCardsTC())
    }, [])

    const openModalHandler = useCallback(() => {
        setOpened(true)
    }, [])

    const closeModalHandler = useCallback(() => {
        setOpened(false)
    }, [])

    const addPack = (name: string) => {
        dispatch(addPackofCardsTC({name}))
    }

    const removePackOfCards = useCallback((packId: string) => {
        dispatch(removePackOfCardsTC(packId));
    }, [dispatch])

    const updateNamePackOfCards = useCallback((packId: string, name: string) => {
        dispatch(updateNamePackOfCardsTC({_id: packId, name}));
    }, [dispatch])

    // for sort
    const allPacksHandler = () => {
        dispatch((fetchPackCardsTC({pageCount})))
    }
    const MyPacksHandler = () => {
        dispatch((getUsersPacksTC(pageCount)))
    }

    const sortPacksMinCardstHandler = () => {
        dispatch(fetchPackCardsTC({sortPacks: '1cardsCount', pageCount}))
    }
    const sortPacksMaxCardstHandler = () => {
        dispatch(fetchPackCardsTC({sortPacks: '0cardsCount', pageCount}))
    }

    //for Slider
    useUpdateEffect(() => {
        dispatch(fetchPackCardsTC({min: value[0], max: value[1], pageCount}))
    }, [debouncedValue])


    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.blockCards}>
            <div className={classes.boxSearchButton}>
                <SearchPacks/>
                <button onClick={openModalHandler} className={classes.btnHandler}>Add new pack</button>
            </div>
            <div className={classes.boxButtonAndSlider}>
                <div>
                    <button className={classes.btnHandler} onClick={allPacksHandler}>All</button>
                    <button className={classes.btnHandler} onClick={MyPacksHandler}>My</button>
                </div>
                <div>
                    <Box sx={{width: 300, marginRight: "10px", textAlign: 'center'}}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </div>
            </div>
            <div className={classes.boxCardsPack}>
                <div className={classes.blockNameCards}>
                    <span>Name</span>
                    <span>Cards Count<span>
                        <i className={classes.up} onClick={sortPacksMinCardstHandler}></i>
                        <i className={classes.down} onClick={sortPacksMaxCardstHandler}></i>
                    </span>
                    </span>
                    <span>Updated</span>
                    <span>Actions</span>
                </div>
                <Modal
                    addItem={(title: string) => addPack(title)}
                    isOpened={isOpened}
                    title={'Add new pack of cards'}
                    onModalClose={closeModalHandler}
                />
                {
                    cardsPacks.map(pack => {
                        return (
                            <div key={pack._id}>
                                <PackOfCards
                                    packId={pack._id}
                                    name={pack.name}
                                    cardsCount={pack.cardsCount}
                                    updated={pack.updated}
                                    path={pack.path}
                                    title={'Edit the name of pack'}
                                    removePackOfCards={removePackOfCards}
                                    updateNamePackOfCards={updateNamePackOfCards}
                                />
                            </div>
                        )
                    })
                }

            </div>
            <Paginator cardPacksTotalCount={cardPacksTotalCount} page={page} value={value} pageCount={pageCount}/>
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )

}

