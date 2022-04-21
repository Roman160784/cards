import {Dispatch} from "redux";
import {
    CardForCreateType,
    CardForUpdateType,
    cardsApi,
    CardsType,
    getCardsPayloadType
} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import {errorCardsHandler} from "../../Utils/Utils";
import {RootReducerType} from "../a1-store/store";


//types
export type CardsReducerType = {
    cards: CardsType[]
    cardsTotalCount: number
    max: number | null
    min: number | null
    packUserId: string | null
    page: number
    pageCount: number
    token: string | null
    tokenDeathTime: number | null
    error: string | null
    currentAnswer: null | string
    currentQuestion: null | string
    sortCards: string | null
    cardsPack_id: string
    question: string
    answer: string
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
    _id: string


}

//state
const initialState: CardsReducerType = {
    cards: [],
    cardsTotalCount: 0,
    max: 0,
    min: 0,
    packUserId: null,
    page: 1,
    pageCount: 10,
    token: null,
    tokenDeathTime: null,
    error: null,
    currentAnswer: null,
    currentQuestion: null,
    sortCards: null,
    cardsPack_id: '',
    question: '',
    answer: '',
    answerImg: '',
    questionImg: '',
    questionVideo: '',
    answerVideo: '',
    _id: '',
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
        case "CARDS/SET-CURRENT-PAGE": {
            return {...state, page: action.page}
        }
        case "CARDS/SEARCH-PACKS-ANSWER": {
            return {...state, currentAnswer: action.currentAnswer}
        }
        case "CARDS/SEARCH-PACKS-QUESTION": {
            return {...state, currentQuestion: action.currentQuestion}
        }
        case "CARDS/SET-MIN-MAX-CARDS-IN-CARDS": {
            return {...state, min: action.min, max: action.max }
        }
        case "CARDS/SORT-CARDS": {
            return {...state, sortCards: action.sortCards}
        }
        case "CARDS/SET-CARDSPACK-ID": {
            return {...state, cardsPack_id: action.cardsPack_id}
        }
        case 'CARDS/SET-GRADE' : {
            return {...state, cards : state.cards.map(c => c._id === action.id ? {...c, grade: action.grade} : c) }
        }
        case "CARDS/SET-QUESTION": {
            return {...state, question: action.question}
        }
        case "CARDS/SET-ANSWER": {
            return {...state, answer: action.answer}
        }
        case "CARDS/SET-CARD-ID": {
            return {...state, _id: action._id}
        }

        default:
            return {...state}
    }
}

//actions type
export type MainActionType =
    setCardsACType
    | setCardsErrorACType
    | setCardsTotalCountACType
    | setCurrentPageCardsACType
    | searchCardsAnswerACType
    | searchCardsQuestionACType
    | sortCardsACType
    | setMinMaxCardsInCardsACType
    | setCardsPackIdACType
    | setSelectedACType
    | setAnswerACType
    | setQuestionACType
    | setCardIdACType


export type setCardsACType = ReturnType<typeof setCardsAC>
export type setCardsErrorACType = ReturnType<typeof setCardsErrorAC>
export type setCardsTotalCountACType = ReturnType<typeof setCardsTotalCountAC>
export type setCurrentPageCardsACType = ReturnType<typeof setCurrentPageCardsAC>
export type searchCardsAnswerACType = ReturnType<typeof searchCardsAnswerAC>
export type searchCardsQuestionACType = ReturnType<typeof searchCardsQuestionAC>
export type sortCardsACType = ReturnType<typeof sortCardsAC>
export type setMinMaxCardsInCardsACType = ReturnType<typeof setMinMaxCardsInCardsAC>
export type setCardsPackIdACType = ReturnType<typeof setCardsPackIdAC>
export type setSelectedACType = ReturnType<typeof setSelectedAC>
export type setQuestionACType = ReturnType<typeof setQuestionAC>
export type setAnswerACType = ReturnType<typeof setAnswerAC>
export type setCardIdACType = ReturnType<typeof setCardIdAC>


//actions
export const setCardsAC = (cards: CardsType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setCardsErrorAC = (error: string | null) => ({type: 'CARDS/SET-CARDS-ERROR', error} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({type: 'CARDS/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)
export const setSelectedAC = (id: string, grade: number) => ({type: 'CARDS/SET-GRADE', id, grade} as const)
export const setCurrentPageCardsAC = (page: number) => ({type: 'CARDS/SET-CURRENT-PAGE', page} as const)
export const searchCardsAnswerAC = (currentAnswer: string) => ({
    type: 'CARDS/SEARCH-PACKS-ANSWER',
    currentAnswer,
} as const)
export const searchCardsQuestionAC = (currentQuestion: string) => ({
    type: 'CARDS/SEARCH-PACKS-QUESTION',
    currentQuestion,
} as const)
export const sortCardsAC = (sortCards: string) => ({type: 'CARDS/SORT-CARDS', sortCards} as const)
export const setMinMaxCardsInCardsAC = (min: number, max: number) => ({
    type: 'CARDS/SET-MIN-MAX-CARDS-IN-CARDS',
    min,
    max
} as const)
export const setCardsPackIdAC = (cardsPack_id: string) => ({type: 'CARDS/SET-CARDSPACK-ID', cardsPack_id} as const)
export const setQuestionAC = (question: string) => ({type: 'CARDS/SET-QUESTION', question} as const)
export const setAnswerAC = (answer: string) => ({type: 'CARDS/SET-ANSWER', answer} as const)
export const setCardIdAC = (_id: string) => ({type: 'CARDS/SET-CARD-ID', _id} as const)


// thunks
export const getCardsTC = (learnId?: string) => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        const state = getState()
        const payload: getCardsPayloadType = {
            cardsPack_id: learnId ? learnId : state.cards.cardsPack_id,
            cardAnswer: state.cards.currentAnswer || '',
            cardQuestion: state.cards.currentQuestion || '',
            min: state.cards.min || 0,
            max: state.cards.max || 100,
            sortCards: state.cards.sortCards || '',
            page: state.cards.page || 1,
            pageCount: state.cards.pageCount || 10,
        }

        cardsApi.getCards(payload)
            .then((res) => {

                dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
                dispatch(setCardsAC(res.data.cards))
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

export const removeCardTC = (cardId: string) => {
    return (dispatch: Dispatch<any>) => {
        cardsApi.removeCard(cardId)
            .then(() => {
                dispatch(getCardsTC())
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

export const createCardTC = (card: CardForCreateType) => {
    return (dispatch: Dispatch<any>) => {
        cardsApi.createCard(card)
            .then(() => {
                dispatch(getCardsTC())
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

export const updateNameCardTC = (card: CardForUpdateType) => {
    return (dispatch: any) => {
        cardsApi.updateNameCard(card)
            .then((res) => {
                console.log(res.data)
                dispatch(getCardsTC())
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
                dispatch(setSelectedAC(res.data.updatedGrade.card_id, res.data.updatedGrade.grade))
            })
            .catch((e: AxiosError) => {
                errorCardsHandler(e, dispatch)
            })
    }
}

