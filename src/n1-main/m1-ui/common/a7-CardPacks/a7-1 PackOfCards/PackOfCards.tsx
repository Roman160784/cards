import React, {useCallback, useState} from 'react';
import {Modal} from "../Modal/Modal";
import classes from './PackOfCards.module.css'


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
    const updatePackNameHandler = useCallback((name: string) => {
        updateNamePackOfCards(packId, name)
    }, [])
    const openModalHandler = useCallback(() => {
        setOpened(true)
    }, [])
    const closeModalHandler = useCallback(() => {
        setOpened(false)
    }, [])


    return (
        <div className={classes.boxCards}>
            <div className={classes.blockText}>{name}</div>
            <div className={classes.blockText}>{cardsCount}</div>
            <div  className={classes.blockText}>{path}</div>
            <div className={classes.blockText}>{updated}</div>
            <div className={classes.contentBtn}>
                <button className={classes.btn}>learn</button>
                <button className={classes.btn} onClick={openModalHandler}>edit</button>
                <button className={classes.btn} onClick={removePackHandler}>delete</button>
            </div>
            <Modal
                addItem={(title: string) => updatePackNameHandler(title)}
                title={title}
                isOpened={isOpened}
                onModalClose={closeModalHandler}
            />
        </div>
    );
};
