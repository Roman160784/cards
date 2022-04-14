import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import classes from "../a1-Login/Login.module.css";
import {useParams} from "react-router-dom";
import {createCardTC, removeCardTC, updateNameCardTC} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {SearchPacks} from "../c6-SearchPacks/SearchCards";


export const Cards = () => {

    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const error = useSelector<RootReducerType, string | null>(state => state.cards.error)
    const dispatch = useDispatch()

    const params = useParams<'id'>()
    const cardsPack_id = params.id

    const createCardHandler = () => {
        if (cardsPack_id)
            dispatch(createCardTC(cardsPack_id))
    }

    return (
        <div>
            <SearchPacks cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            <div>
                <span>question     </span>
                <span>answer       </span>
                <span>Grade        </span>
                <span>updated      </span>
                <span>url          </span>
                <button onClick={createCardHandler}>Add new card</button>
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
                            <span>{card.grade}</span>
                            <span>{card.updated}</span>
                            <button onClick={removeCardHandler}>del</button>
                            <button onClick={updateNameCardHandler}>update</button>
                        </div>
                    )
                })
            }
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )
}
