import React from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import { CardsPacksType } from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import {Search} from "../c6-Search/Search";



export const CardsPacks = () => {

    const cardsPacks = useSelector<RootReducerType, CardsPacksType[]>(state => state.cardsPacks.cardsPacks)

    return (
        <div>
            <Search searchArray={cardsPacks}/>
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

