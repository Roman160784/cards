import React from 'react';
import {useDispatch, useSelector,} from "react-redux";
import {createCardTC, removeCardTC, updateNameCard} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";

import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";


export const Cards = () => {

    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const dispatch = useDispatch()
    const createCardHandler = () => {

    }
    return (
        <div>
            <div>
                <button onClick={createCardHandler}>Add new card</button>
            </div>
            {
                cards.map(card => {
                    const removeCardHandler = () => {
                        dispatch(removeCardTC(card.cardsPack_id, card._id))
                    }
                    const updateNameCardHandler = () => {
                        dispatch(updateNameCard(card.cardsPack_id, card._id))
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
        </div>
    )
}
