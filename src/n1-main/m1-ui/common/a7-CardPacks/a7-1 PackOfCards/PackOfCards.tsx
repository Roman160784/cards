import React, {useCallback, useState} from 'react';
import {Modal} from "../Modal/Modal";


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


    const removePackHandler = useCallback(() => {
        removePackOfCards(packId)
    }, [])
    const updatePackNameHandler = useCallback(() =>{
        updateNamePackOfCards(packId)
    }, [])

    return (
        <div>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{path}</div>
            <div>{updated}</div>
            <button>learn</button>
            <button onClick={updatePackNameHandler}>edit</button>
            <button onClick={removePackHandler}>delete</button>
        </div>
    );
};
