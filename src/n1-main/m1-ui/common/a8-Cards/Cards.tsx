import React from 'react';
import { useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";


export const Cards = () => {

    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)




    return (
        <div>
            <div>
                <span>question     </span>
                <span>answer       </span>
                <span>Grade        </span>
                <span>updated      </span>
                <span>url          </span>
                <button>ADD</button>
            </div>
            <div>
                {
                    cards.map(card => {
                        return (
                            <div key={card._id}>
                                <span>{card.question}</span>
                                <span>{card.answer}</span>
                                <span>{card.grade}</span>
                                <span>{card.updated}</span>
                                <button>del</button>
                                <button>update</button>
                            </div>
                        )
                    })
                }
            </div>
    </div>

    )
}
