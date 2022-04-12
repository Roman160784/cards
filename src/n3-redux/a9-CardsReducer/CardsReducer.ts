import {Dispatch} from "redux";
import {cardsApi, CardsType} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";


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
    error: string | null
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
    tokenDeathTime: null,
    error: null
}

//reducer
export const CardsReducer = (state: CardsReducerType = initialState, action: MainActionType): CardsReducerType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {...state, cards: action.cards}
        }
        case 'PACKS/SET-CARDS-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

//actions type
export type MainActionType = setCardsACType | setCardsErrorACType

export type setCardsACType = ReturnType<typeof setCardsAC>
export type setCardsErrorACType = ReturnType<typeof setCardsErrorAC>

//actions
export const setCardsAC = (cards: CardsType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setCardsErrorAC = (error: string | null) => ({type: 'PACKS/SET-CARDS-ERROR', error} as const)



// thunks
export const getCardsTC = (cardsPack_id: string) => {
    return (dispatch: Dispatch) => {
        cardsApi.getCards(cardsPack_id)
            .then((res) => {
                dispatch(setCardsAC(res.data.cards))
            })
            .catch((e: AxiosError) => {
                dispatch(setCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setCardsErrorAC(null))
                }, 3000)
            })
    }
}
export const removeCardTC = (cardsPack_id: string, cardId: string) => {
    return (dispatch: any) => {
        cardsApi.removeCard(cardId)
            .then((res) => {
                dispatch(getCardsTC(cardsPack_id))
            })
            .catch((e: AxiosError) => {
                dispatch(setCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setCardsErrorAC(null))
                }, 3000)
            })
    }
}
export const createCardTC = (cardsPack_id: string ) => {
    return (dispatch: any) => {
        cardsApi.createCard(cardsPack_id)
            .then((res) => {
                console.log({...res})
                dispatch(getCardsTC(cardsPack_id))
            })
            .catch((e: AxiosError) => {
                dispatch(setCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setCardsErrorAC(null))
                }, 5000)
            })
    }
}

export const updateNameCardTC = (cardsPack_id: string, cardId: string) => {
    return (dispatch: any) => {
        cardsApi.updateNameCard(cardId)
            .then((res) => {
                dispatch(getCardsTC(cardsPack_id))
            })
            .catch((e: AxiosError) => {
                dispatch(setCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setCardsErrorAC(null))
                }, 3000)
            })
    }
}

export const searchCardsTC = (cardsPack_id: string, cardAnswer: string) => {
    return (dispatch: any) => {
        cardsApi.searchCards(cardsPack_id, cardAnswer)
            .then(res => {
                dispatch(getCardsTC(cardsPack_id))
            })
    }
}