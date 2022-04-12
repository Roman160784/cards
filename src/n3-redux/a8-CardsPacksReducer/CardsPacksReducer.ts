import {Dispatch} from "redux";
import {AddCardPackType, packCardsAPI, UpdateNameCardPackType} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import {setUserErrorAC} from "../a6-ProfileReducer/ProfileReducer";
import {isAuthAC, setInitializedAC} from "../a7-AppReducer/AppReducer";
import {setIsLoginAC} from "../a2-loginReducer/loginReducer";



//types
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
    error: string | null
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
    tokenDeathTime: null,
    error: null
}

//reducer
export const CardsPacksReducer = (state: CardsPacksReducerType = initialState, action: MainActionType): CardsPacksReducerType => {
    switch (action.type) {
        case 'PACKS/SET-PACK-CARDS': {
            return {...state, cardsPacks: action.cardPacks}
        }
        case 'PACKS/SET-PACK-CARDS-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

//actions type
export type MainActionType = setPackCardsACType | setPackCardsErrorACType

export type setPackCardsACType = ReturnType<typeof setPackCardsAC>
export type setPackCardsErrorACType = ReturnType<typeof setPackCardsErrorAC>

//actions
export const setPackCardsAC = (cardPacks: CardsPacksType[]) => ({type: 'PACKS/SET-PACK-CARDS', cardPacks} as const)
export const setPackCardsErrorAC = (error: string | null) => ({type: 'PACKS/SET-PACK-CARDS-ERROR', error} as const)



// thunks

export const fetchPackCardsTC = () => {
    return (dispatch: Dispatch) => {
        return packCardsAPI.getPackOfCards()
            .then((res) => {
                dispatch(isAuthAC(true))
                dispatch(setIsLoginAC(true))
                dispatch(setPackCardsAC(res.data.cardPacks))
            })
            .catch((e: AxiosError) => {
                dispatch(setPackCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setPackCardsErrorAC(null))
                }, 3000)
            })
            .finally(() => {
                dispatch(setInitializedAC(true))
            })
    }
}
export const addPackofCardsTC = (cardsPack: AddCardPackType) => (dispatch: any) => {
        packCardsAPI.addPackOfCards(cardsPack)
            .then((res) => {
                dispatch(fetchPackCardsTC())
            })
            .catch((e: AxiosError) => {
                dispatch(setPackCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setPackCardsErrorAC(null))
                }, 3000)
            })
}
export const removePackOfCardsTC = (id: string) => (dispatch: any) => {
    packCardsAPI.removePackOfCards(id)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            dispatch(setPackCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
            setTimeout(() => {
                dispatch(setPackCardsErrorAC(null))
            }, 3000)
        })
}

export const updateNamePackOfCardsTC = (cardsPack: UpdateNameCardPackType) => (dispatch: any) => {
    packCardsAPI.updateNamePackOfCards(cardsPack)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            dispatch(setPackCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
            setTimeout(() => {
                dispatch(setPackCardsErrorAC(null))
            }, 3000)
        })
}

export const searchPacksCardsTC = (value?: string) => {
    return (dispatch: Dispatch) => {
        return packCardsAPI.searchPacs(value)
            .then((res) => {
                dispatch(setPackCardsAC(res.data.cardPacks))
            })
            .catch((e: AxiosError) => {
                dispatch(setPackCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setPackCardsErrorAC(null))
                }, 3000)
            })
    }
}