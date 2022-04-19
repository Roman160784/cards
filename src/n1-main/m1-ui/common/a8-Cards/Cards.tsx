import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {useParams} from "react-router-dom";
import {
    CardsReducerType,
    setSelectedAC,
    createCardTC, getCardsTC,
    removeCardTC, setCardsPackIdAC,
    updateNameCardTC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {SearchCards} from "../c6-SearchPacks/SearchCards";
import classes from './Cards.module.css'
import {CardsPaginator} from "./cardsPaginater";
import {Statrs} from "../c7-Stars/Stars";
import {addPackofCardsTC} from "../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";
import {Modal1} from "../a7-CardPacks/Modal/Modal1";


export const Cards = () => {
    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const error = useSelector<RootReducerType, string | null>(state => state.cards.error)
    const {pageCount, page, cardsTotalCount, max, min, sortCards, currentAnswer, currentQuestion} = useSelector<RootReducerType, CardsReducerType>(state => state.cards)
    const dispatch = useDispatch()

    const params = useParams<'id'>()
    const cardsPack_id = params.id
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState<string>('')

    useEffect(() => {
        if(cardsPack_id) {
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(getCardsTC())
        }
    }, [cardsPack_id, pageCount, page, max, min, sortCards, currentQuestion, currentAnswer])

    const createCardHandler = () => {

    }

    const addCard = useCallback((name: string) => {
        if(cardsPack_id){
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(createCardTC(cardsPack_id))
        }
        setName('')
        setModalActive(false)
    }, [dispatch])
    const onChangeModalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onKeyPressModalHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') addCard(name)
    }
    const onCloseModalHandler = () => {
        setModalActive(false)
        setName('')
    }


    const getCardsGrateHandler = (id:string,value: number ) => {
        dispatch(setSelectedAC(id, value))
    }


    return (
        <div className={classes.boxCard}>
            <SearchCards cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            <div className={classes.blockCard}>
                <span>  Question</span>
                <span>Answer</span>
                <span>Grade</span>
                <span>Updated</span>
                <span>Url</span>
                <button onClick={() => setModalActive(true)} className={classes.buttonAddCard}>Add new card</button>
            </div>
            <Modal1 active={modalActive} setActive={setModalActive}>
                <div className={classes.modalTitle}>Card Info</div>
                <div className={classes.modalInputBox}>
                    <div>
                        <span className={classes.modalSpan}>Question</span>
                        <input
                            value={name}
                            onKeyPress={onKeyPressModalHandler}
                            onChange={onChangeModalHandler}
                            className={classes.modalInput}
                            placeholder={'Enter your new pack name...'}
                            autoFocus
                        />
                    </div>
                    <div>
                        <span className={classes.modalSpan}>Answer</span>
                        <input
                            value={name}
                            onKeyPress={onKeyPressModalHandler}
                            onChange={onChangeModalHandler}
                            className={classes.modalInput}
                            placeholder={'Enter your new pack name...'}
                            autoFocus
                        />
                    </div>
                </div>
                <div className={classes.btnModalWrap}>
                    <button className={classes.modalButtonSave} onClick={() => addCard(name)}>save</button>
                    <button className={classes.modalButtonCancel} onClick={onCloseModalHandler}>cancel</button>
                </div>

            </Modal1>
            {
                cards.map(card => {
                    const removeCardHandler = () => {
                        dispatch(setCardsPackIdAC(card.cardsPack_id))
                        dispatch(removeCardTC(card._id))
                    }
                    const updateNameCardHandler = () => {
                        dispatch(setCardsPackIdAC(card.cardsPack_id))
                        dispatch(updateNameCardTC(card._id))
                    }
                    return (
                        <div key={card._id}>
                            <span>{card.question}</span>
                            <span>{card.answer}</span>
                            <Statrs  selected={card.grade > 0} callBack={getCardsGrateHandler} id={card._id} value={1}/>
                            <Statrs  selected={card.grade > 1} callBack={getCardsGrateHandler} id={card._id} value={2}/>
                            <Statrs  selected={card.grade > 2} callBack={getCardsGrateHandler} id={card._id} value={3}/>
                            <Statrs  selected={card.grade > 3} callBack={getCardsGrateHandler} id={card._id} value={4}/>
                            <Statrs  selected={card.grade > 4} callBack={getCardsGrateHandler} id={card._id} value={5}/>
                            <span>{card.updated}</span>
                            <button onClick={removeCardHandler}>del</button>
                            <button onClick={updateNameCardHandler}>update</button>
                        </div>
                    )
                })
            }
            <CardsPaginator cardsTotalCount={cardsTotalCount} page={page} pageCount={pageCount}/>
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )
}
