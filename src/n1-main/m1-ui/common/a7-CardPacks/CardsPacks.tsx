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


export const CardsPacks = () => {
    const error = useSelector<RootReducerType, string | null>(state => state.cardsPacks.error)
    const {pageSize, page, cardPacksTotalCount, cardsPacks} = useSelector<RootReducerType,CardsPacksReducerType>(state => state.cardsPacks)
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


    return (
        <div className={classes.blockCards}>
            <div className={classes.boxSearchButton}>
                <SearchPacks/>
                <button onClick={openModalHandler} className={classes.btnHandler}>Add new pack</button>
            </div>
            <div>
                <button className={classes.btnHandler} onClick={allPacksHandler}>All</button>
                <button className={classes.btnHandler} onClick={MyPacksHandler}>My</button>
            </div>
            <div className={classes.boxCardsPack}>
                <div className={classes.blockNameCards}>
                    <span>Name</span>
                    <span>Cards Count</span>
                    <span onClick={sortPacksMinCardstHandler}>sortMin</span>
                    <span onClick={sortPacksMaxCardstHandler}>sortMax</span>
                    <span>Updated</span>
                    <span>url</span>
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

