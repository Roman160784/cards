import {Dispatch} from "redux";
import {cardsApi, CardsType, getCardsPayloadType} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import {errorCardsHandler} from "../../Utils/Utils";
import {RootReducerType} from "../a1-store/store";


//types
export type CardsReducerType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number | null
    minGrade: number | null
    packUserId: string| null
    page: number
    pageCount: number
    token: string | null
    tokenDeathTime: number | null
    error: string | null
    currentAnswer : null | string
    currentQuastion : null | string

}

//state
const initialState: CardsReducerType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: null,
    page: 1,
    pageCount: 10,
    token: null,
    tokenDeathTime: null,
    error: null,
    currentAnswer : null,
    currentQuastion : null,
}

//reducer
export const CardsReducer = (state: CardsReducerType = initialState, action: MainActionType): CardsReducerType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {...state, cards: action.cards}
        }
        case 'CARDS/SET-CARDS-ERROR': {
            return {...state, error: action.error}
        }
        case 'CARDS/SET-CARDS-TOTAL-COUNT' : {
            return {...state, cardsTotalCount: action.cardsTotalCount}
        }
        case 'CARDS/SET-CARDS-PAGE' : {
            return {...state, page: action.page}
        }
        case 'CARDS/SET-CURRENT-ANSWER' : {
            return {...state, currentAnswer: action.currentAnswer}
        }
        case 'CARDS/SET-CURRENT-QUESTION' : {
            return {...state, currentQuastion: action.currentQuestion}
        }
        case 'CARDS/SET-GRADE' : {
            return {...state, cards : state.cards.map(c => c._id === action.id ? {...c, grade: action.grade} : c) }
        }
        default:
            return {...state}
    }
}

//actions type
export type MainActionType = setCardsACType | setCardsErrorACType | setCardsTotalCountACType | setCardsPageACType | setCurrentAnswerACType | setCurrentQuastionACType | setSelectedACType

export type setCardsACType = ReturnType<typeof setCardsAC>
export type setCardsErrorACType = ReturnType<typeof setCardsErrorAC>
export type setCardsTotalCountACType = ReturnType<typeof setCardsTotalCountAC>
export type setCardsPageACType = ReturnType<typeof setCardsPageAC>
export type setCurrentAnswerACType = ReturnType<typeof setCurrentAnswerAC>
export type setCurrentQuastionACType = ReturnType<typeof setCurrentQuastionAC>
export type setSelectedACType = ReturnType<typeof setSelectedAC>

//actions
export const setCardsAC = (cards: CardsType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setCardsErrorAC = (error: string | null) => ({type: 'CARDS/SET-CARDS-ERROR', error} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({type: 'CARDS/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)
export const setCardsPageAC = (page: number) => ({type: 'CARDS/SET-CARDS-PAGE', page} as const)
export const setCurrentAnswerAC = (currentAnswer: string) => ({type: 'CARDS/SET-CURRENT-ANSWER', currentAnswer} as const )
export const setCurrentQuastionAC = (currentQuestion: string) => ({type: 'CARDS/SET-CURRENT-QUESTION', currentQuestion} as const )
export const setSelectedAC = (id: string, grade: number) => ({type: 'CARDS/SET-GRADE', id, grade} as const)

// thunks

export const getCardsTC = (payload: getCardsPayloadType) => {
    return (dispatch: Dispatch) => {


        if(payload.page)
        dispatch(setCardsPageAC(payload.page))

        if(payload.cardAnswer)
            dispatch(setCurrentAnswerAC(payload.cardAnswer))

        if(payload.cardQuestion)
            dispatch(setCurrentQuastionAC(payload.cardQuestion))

        cardsApi.getCards({...payload, pageCount: 10})
            .then((res) => {
                dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
                dispatch(setCardsAC(res.data.cards))

            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

export const removeCardTC = (cardsPack_id: string, cardId: string) => {
    return (dispatch: any) => {
        cardsApi.removeCard(cardId)
            .then((res) => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}
export const createCardTC = (cardsPack_id: string ) => {
    return (dispatch: any) => {
        cardsApi.createCard(cardsPack_id)
            .then((res) => {
                // console.log({...res})
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

export const updateNameCardTC = (cardsPack_id: string, cardId: string) => {
    return (dispatch: any) => {
        cardsApi.updateNameCard(cardId)
            .then((res) => {
                dispatch(getCardsTC({cardsPack_id}))
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

export const uptdateCardsGradeTC = (grade: number, card_id: string) => {
    return (dispatch: Dispatch) => {
        cardsApi.updateCardsGrade(grade, card_id)
            .then((res) => {

            })
            .catch((e:AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

