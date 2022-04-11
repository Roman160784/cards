

//types
import {Dispatch} from "redux";
import {cardsApi} from "../../n4-dal/API/CardsAPI";

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

export type CardsPacksReducerType = {
    cardsPacks: CardsPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string | null
    tokenDeathTime: number | null
}

//state
const initialState: CardsPacksReducerType = {
    cardsPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 0,
    token: null,
    tokenDeathTime: null
}

//reducer
export const CardsPacksReducer = (state: CardsPacksReducerType = initialState, action: MainActionType): CardsPacksReducerType => {
    switch (action.type) {
        case 'PACKS/SET-PACK-CARDS': {
            return {...state, cardsPacks: action.cardPacks}
        }
        default:
            return {...state}
    }
}

//actions type
export type MainActionType = setPackCardsACType

export type setPackCardsACType = ReturnType<typeof setPackCardsAC>


//actions
export const setPackCardsAC = (cardPacks: CardsPacksType[]) => ({type: 'PACKS/SET-PACK-CARDS', cardPacks} as const)


// thunks

export const getCardsTC = (cardsPack_id: string) => {
    return (dispatch: Dispatch) => {
        cardsApi.getCards(cardsPack_id)
            .then((res) => {
                console.log({...res})
            })
    }
}