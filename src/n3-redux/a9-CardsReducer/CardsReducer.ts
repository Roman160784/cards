import {Dispatch} from "redux";
import {cardsApi, CardsType} from "../../n4-dal/API/CardsAPI";
import {setIsLoginAC} from "../a2-loginReducer/loginReducer";
import {isAuthAC, setInitializedAC} from "../a7-AppReducer/AppReducer";


//types
export type CardsReducerType = {
    cards: CardsType[]
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    packUserId: string| null
    page: number | null
    pageCount: number | null
    token: string | null
    tokenDeathTime: number | null
}

//state
const initialState: CardsReducerType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 6,
    minGrade: 0,
    packUserId: null,
    page: 1,
    pageCount: 4,
    token: null,
    tokenDeathTime: null
}

//reducer
export const CardsReducer = (state: CardsReducerType = initialState, action: MainActionType): CardsReducerType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {...state, cards: action.cards}
        }
        default:
            return {...state}
    }
}

//actions type
export type MainActionType = setCardsACType

export type setCardsACType = ReturnType<typeof setCardsAC>


//actions
export const setCardsAC = (cards: CardsType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)


// thunks
export const getCardsTC = (cardsPack_id: string) => {
    return (dispatch: Dispatch) => {
        cardsApi.getCards(cardsPack_id)
            .then((res) => {
                dispatch(setCardsAC(res.data.cards))
            })
    }
}
export const removeCardTC = (cardsPack_id: string, cardId: string) => {
    return (dispatch: any) => {
        cardsApi.removeCard(cardId)
            .then((res) => {
                dispatch(getCardsTC(cardsPack_id))
            })
    }
}
export const createCardTC = (cardsPack_id: string) => {
    return (dispatch: any) => {
        cardsApi.createCard(cardsPack_id)
            .then((res) => {
                dispatch(getCardsTC(cardsPack_id))
            })
    }
}

export const updateNameCard = (cardsPack_id: string, cardId: string) => {
    return (dispatch: any) => {
        cardsApi.updateNameCard(cardId)
            .then((res) => {
                dispatch(getCardsTC(cardsPack_id))
            })
    }
}