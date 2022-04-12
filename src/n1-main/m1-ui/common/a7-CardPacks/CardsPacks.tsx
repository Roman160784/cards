import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    addPackofCardsTC,
    CardsPacksType, fetchPackCardsTC,
    removePackOfCardsTC, updateNamePackOfCardsTC
} from "../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";
import {SearchPacks} from "../c6-SearchPacks/SearchPacks";
import {PackOfCards} from "./a7-1 PackOfCards/PackOfCards";
import {Modal} from "./Modal/Modal";
import classes from './../a7-CardPacks/CardsPacks.module.css'


export const CardsPacks = () => {
    let dispatch = useDispatch()

    const cardsPacks = useSelector<RootReducerType, CardsPacksType[]>(state => state.cardsPacks.cardsPacks)
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


    return (
        <div className={classes.blockCards}>
            <div className={classes.boxSearchButton}>
                <SearchPacks/>
                <button onClick={openModalHandler} className={classes.btnHandler}>Add new pack</button>
            </div>
            <div className={classes.boxCardsPack}>
                <div className={classes.blockNameCards}>
                    <span>Name</span>
                    <span>Cards Count</span>
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
        </div>
    )

}

