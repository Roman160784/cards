import React, {useCallback, useEffect, useState} from 'react';
import {Modal} from "../Modal/Modal";
import {useDispatch} from "react-redux";
import {getCardsTC} from "../../../../../n3-redux/a9-CardsReducer/CardsReducer";


type PropsType = {
    packId: string
    removePackOfCards: (packId: string) => void
    updateNamePackOfCards: (packId: string, name: string) => void
    title: string
    name: string
    cardsCount: number
    updated: Date
    path: string
}

export const PackOfCards = ({
                                packId, name, cardsCount, updateNamePackOfCards,
                                removePackOfCards, path, updated,
                                title
}: PropsType) => {

    const [isOpened, setOpened] = useState<boolean>(false)
    const dispatch = useDispatch()


    const removePackHandler = useCallback(() => {
        removePackOfCards(packId)
    }, [])
    const updatePackNameHandler = useCallback((name: string) =>{
        updateNamePackOfCards(packId, name)
    }, [])
    const openModalHandler = useCallback(() => {
        setOpened(true)
    }, [])

    const closeModalHandler = useCallback(() => {
        setOpened(false)
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
            <button onClick={openModalHandler}>edit</button>
            <button onClick={() =>{learnClickHandler(packId)}}>learn</button>
            <button onClick={removePackHandler}>delete</button>
            <Modal
                addItem={(title: string) => updatePackNameHandler(title)}
                title={title}
                isOpened={isOpened}
                onModalClose={closeModalHandler}
            />
        </div>
    );
};
