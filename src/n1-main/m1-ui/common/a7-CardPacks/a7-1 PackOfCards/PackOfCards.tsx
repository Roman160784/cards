import React, {useCallback, useEffect, useState} from 'react';
import classes from './PackOfCards.module.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ModalInput from "../Modal/ModalInput";
import {updateNamePackOfCardsTC} from "../../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";


type PropsType = {
    packId: string
    userId: string
    title: string
    name: string
    cardPackUserId: string
    cardsCount: number
    updated: Date
    path: string
    removePackOfCards: (packId: string) => void

}

export const PackOfCards = ({
                                packId, name, cardsCount,
                                removePackOfCards, path, updated,
                                title, userId, cardPackUserId
                            }: PropsType) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState('test answer');

    const [editName, setEditName] = useState('');

    const removePackHandler = useCallback(() => {
        removePackOfCards(packId)
    }, [])
    const updateNamePackOfCards = useCallback(() => {
        dispatch(updateNamePackOfCardsTC({_id: packId, name: editName}));
    }, [editName])



    const learnClickHandler = () => {
        return navigate(`/cards/${packId}`)
    }

    return (
        <div className={classes.boxCards}>
            <div className={classes.blockText} onClick={learnClickHandler}>{name}</div>
            <div className={classes.blockText}>{cardsCount}</div>
            {/*<div className={classes.blockText}>{path}</div>*/}
            <div className={classes.blockText}>{updated}</div>
            <div className={classes.contentBtn}>
                {cardPackUserId === userId && <button
                    className={classes.btn}
                    onClick={() => setShow(true)}
                >edit
                </button>}
                <button
                    className={classes.btn}
                    onClick={learnClickHandler}
                >learn
                </button>
                {cardPackUserId === userId && <button
                    className={classes.btn}
                    onClick={removePackHandler}
                >delete
                </button>}
            </div>
            <ModalInput
                show={show}
                close={() => setShow(false)}

                answer={answer}
                setAnswer={setAnswer}

                inputData={[[editName, setEditName]]}
                children={'Edit your pack name'}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
            />
        </div>
    );
};
