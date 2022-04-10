import React from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";

export type CardsPacksType = {
    cardsCount: number
    created: Date
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export const CardsPacks = () => {

    const cardsPacks = useSelector<RootReducerType, CardsPacksType[]>(state => state.cardsPacks.cardsPacks)

    return (
        <div>
            <div>
                <span>Name  </span>
                <span>cardsCount  </span>
                <span>updated  </span>
                <span>url  </span>
                <button>ADD   </button>
            </div>

            <div>
                {
                    cardsPacks.map(pack => {
                        return (
                            <div key={pack._id}>
                                <span>{pack.name}</span>
                                <span>{pack.cardsCount}</span>
                                <span>{pack.updated}</span>
                                <span>{pack.path}</span>
                                <button>del</button>
                                <button>update</button>
                                <span>cards</span>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )

}
