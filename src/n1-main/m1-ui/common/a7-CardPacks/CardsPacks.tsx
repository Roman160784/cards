import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    addPackofCardsTC,
    CardsPacksReducerType,
    fetchPackCardsTC,
    getUsersPacksTC,
    removePackOfCardsTC,
    sortMaxCardsInPackAC,
    sortMinCardsInPackAC,
    updateNamePackOfCardsTC
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import {SearchPacks} from "../c6-SearchPacks/SearchPacks";
import {PackOfCards} from "./a7-1 PackOfCards/PackOfCards";
import {Modal} from "./Modal/Modal";
import classes from './../a7-CardPacks/CardsPacks.module.css'
import {Paginator} from "./Paginator/Paginator";
import {Box, Slider} from "@mui/material";

function SearchCards() {
    return null;
}

export const CardsPacks = () => {
    const error = useSelector<RootReducerType, string | null>(state => state.cardsPacks.error)
    const {
        pageSize,
        page,
        cardPacksTotalCount,
        cardsPacks
    } = useSelector<RootReducerType, CardsPacksReducerType>(state => state.cardsPacks)
    let dispatch = useDispatch()

    const [isOpened, setOpened] = useState<boolean>(false)

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

    const allPacksHandler = () => {
        dispatch((fetchPackCardsTC()))
    }
    const MyPacksHandler = () => {
        dispatch((getUsersPacksTC()))
    }

    const sortPacksMinCardstHandler = () => {
        dispatch(sortMinCardsInPackAC())
    }
    const sortPacksMaxCardstHandler = () => {
        dispatch(sortMaxCardsInPackAC())
    }

    const [value, setValue] = useState([20, 80]);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.blockCards}>
            <div className={classes.boxSearchButton}>
                <SearchCards/>
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
            <Paginator cardPacksTotalCount={cardPacksTotalCount} page={page} pageSize={pageSize}/>
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )

}

