import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    CardsPacksType,
    fetchPackCardsTC,
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import { SearchPacks} from "../c6-SearchPacks/SearchPacks";



export const CardsPacks = () => {

    const cardsPacks = useSelector<RootReducerType, CardsPacksType[]>(state => state.cardsPacks.cardsPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPackCardsTC())
    }, [])


    return (
        <div>
            <SearchPacks/>
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

