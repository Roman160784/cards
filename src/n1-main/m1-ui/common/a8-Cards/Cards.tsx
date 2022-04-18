import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {useParams} from "react-router-dom";
import {
    CardsReducerType,
    createCardTC,
    removeCardTC,
    setSelectedAC,
    updateNameCardTC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {SearchCards} from "../c6-SearchPacks/SearchCards";
import classes from './Cards.module.css';
import {CardsPaginator} from "./cardsPaginater";
import {Statrs} from "../c7-Stars/Stars";


export const Cards = () => {
    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const error = useSelector<RootReducerType, string | null>(state => state.cards.error)
    const { pageCount, page, cardsTotalCount} = useSelector<RootReducerType, CardsReducerType>(state => state.cards)
    const dispatch = useDispatch()



    const params = useParams<'id'>()
    const cardsPack_id = params.id

    const createCardHandler = () => {
        if (cardsPack_id)
            dispatch(createCardTC(cardsPack_id))
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
                <button onClick={createCardHandler} className={classes.buttonAddCard}>Add new card</button>
            </div>

            {
                cards.map(card => {
                    const removeCardHandler = () => {
                        dispatch(removeCardTC(card.cardsPack_id, card._id))
                    }
                    const updateNameCardHandler = () => {
                        dispatch(updateNameCardTC(card.cardsPack_id, card._id))
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
            <CardsPaginator cardsTotalCount={cardsTotalCount} page={page} packId={cardsPack_id} pageCount={pageCount}/>
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )
}
