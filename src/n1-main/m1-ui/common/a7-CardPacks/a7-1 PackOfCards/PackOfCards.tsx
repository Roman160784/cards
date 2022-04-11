import React, {useCallback, useState} from 'react';
import {Modal} from "../Modal/Modal";


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


    return (
        <div>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{path}</div>
            <div>{updated}</div>
            <button>learn</button>
            <button onClick={openModalHandler}>edit</button>
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
