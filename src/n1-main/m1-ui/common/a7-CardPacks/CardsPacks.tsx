import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    addPackofCardsTC,
    CardsPacksType,
    fetchPackCardsTC, removePackOfCardsTC, updateNamePackOfCardsTC
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';

import {Modal} from "./Modal/Modal";
import {Search} from "../c6-Search/Search";
import {PackOfCards} from "./a7-1 PackOfCards/PackOfCards";

import {
    CardsPacksType,
    fetchPackCardsTC,
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import { SearchPacks} from "../c6-SearchPacks/SearchPacks";



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
    const updateNamePackOfCards = useCallback((packId: string) => {
        dispatch(updateNamePackOfCardsTC({_id: packId}));
    }, [dispatch])


    return (
        <div>
            <SearchPacks/>
            <div>
                <span>Name  </span>
                <span>cardsCount  </span>
                <span>updated  </span>
                <span>url  </span>
                <button onClick={openModalHandler}>ADD   </button>
            </div>
            <Modal
                addItem={(title: string) => addPack(title)}
                isOpened={isOpened}
                title={'Add new pack of cards'}
                onModalClose={closeModalHandler}
            />
            <div>
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

