import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import classes from './PackOfCards.module.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateNamePackOfCardsTC} from "../../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";
import {Modal1} from "../Modal/Modal1";
import {callbackify} from "util";


type PropsType = {
    packId: string
    userId: string
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
                                userId, cardPackUserId
                            }: PropsType) => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const removePackHandler = useCallback(() => {
        removePackOfCards(packId)
    }, [])
    const updateNamePackOfCards = useCallback((title: string) => {
        dispatch(updateNamePackOfCardsTC({_id: packId, name: title}));
        setTitle('')
        setModalActive(false)
    }, [dispatch, name])

    const onChangeModalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressModalHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') updateNamePackOfCards(title)
    }
    const onCloseModalHandler = () => {
        setModalActive(false)
        setTitle('')
    }
    const onCloseModalDeleteHandler = () => {
        setModalDeleteActive(false)
    }


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
                    onClick={() => setModalActive(true)}
                >edit
                </button>}
                <button
                    className={classes.btn}
                    onClick={learnClickHandler}
                >learn
                </button>
                {cardPackUserId === userId && <button
                    className={classes.btn}
                    onClick={() => setModalDeleteActive(true)}
                >delete
                </button>}
            </div>
            <Modal1 active={modalActive} setActive={setModalActive}>
                <div className={classes.modalTitle}>Edit your pack name</div>
                <input
                    value={title}
                    onKeyPress={onKeyPressModalHandler}
                    onChange={onChangeModalHandler}
                    className={classes.modalInput}
                    placeholder={'Edit here...'}
                    autoFocus
                />
                <div className={classes.btnModalWrap}>
                    <button className={classes.modalButtonSave} onClick={() => updateNamePackOfCards(title)}>save</button>
                    <button className={classes.modalButtonCancel} onClick={onCloseModalHandler}>cancel</button>
                </div>
            </Modal1>
            <Modal1 active={modalDeleteActive} setActive={setModalDeleteActive}>
                <div className={classes.modalTitle}>Delete Pack</div>
                <div className={classes.modalDelete}>Do you really want to remove
                    <span className={classes.modalSpanPackName}>{`Pack Name - ${name}?`}</span>
                    <br/>
                    All cards will be excluded from this course.</div>
                <div className={classes.btnModalWrap}>
                    <button className={classes.modalButtonCancel} onClick={removePackHandler}>delete</button>
                    <button className={classes.modalButtonSave} onClick={onCloseModalDeleteHandler}>cancel</button>
                </div>
            </Modal1>
        </div>
    );
};
