import React from 'react';
import { useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {Card} from "./Card/Card";


export const Cards = () => {

    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)

    return (
        <div>
            <div>
                <button>ADD</button>
            </div>
            <div>
                {
                    cards.map(card => {
                        return (
                            <div key={card._id}>
                                <Card
                                    id={card._id}
                                    question={card.question}
                                    answer={card.answer}
                                    grade={card.grade}
                                    updated={card.updated}
                                />
                            </div>
                        )
                    })
                }
            </div>
    </div>

    )
}
