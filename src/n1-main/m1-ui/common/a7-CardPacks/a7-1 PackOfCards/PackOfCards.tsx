import React, {useCallback, useEffect, useState} from 'react';
import {Modal} from "../Modal/Modal";
import {useDispatch} from "react-redux";
import {getCardsTC} from "../../../../../n3-redux/a9-CardsReducer/CardsReducer";


type PropsType = {
    packId: string
    removePackOfCards: (packId: string) => void
    updateNamePackOfCards: (packId: string) => void
    name: string
    cardsCount: number
    updated: Date
    path: string
}

export const PackOfCards = ({
                                packId, name, cardsCount, updateNamePackOfCards,
                                removePackOfCards, path, updated
}: PropsType) => {

    const dispatch = useDispatch()


    const removePackHandler = useCallback(() => {
        removePackOfCards(packId)
    }, [])

    const updatePackNameHandler = useCallback(() =>{
        updateNamePackOfCards(packId)
    }, [])

    const learnClickHandler = (packId: string) => {
            dispatch(getCardsTC(packId))

    }

    return (
        <div>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{path}</div>
            <div>{updated}</div>
            <button onClick={() =>{learnClickHandler(packId)}}>learn</button>
            <button onClick={updatePackNameHandler}>edit</button>
            <button onClick={removePackHandler}>delete</button>
        </div>
    );
};
