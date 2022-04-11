import {Dispatch} from "redux";
import {AddCardPackType, packCardsAPI, UpdateNameCardPackType} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import {setUserErrorAC} from "../a6-ProfileReducer/ProfileReducer";



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

export const fetchPackCardsTC = () => {
    return (dispatch: Dispatch) => {
        return packCardsAPI.getPackOfCards()
            .then((res) => {
                dispatch(setPackCardsAC(res.data.cardPacks))
            })
            .catch((e: AxiosError) => {
                dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setUserErrorAC(null))
                }, 3000)
            })
    }
}
export const addPackofCardsTC = (cardsPack: AddCardPackType) => (dispatch: any) => {
        packCardsAPI.addPackOfCards(cardsPack)
            .then((res) => {
                dispatch(fetchPackCardsTC())
            })
            .catch((e: AxiosError) => {
                dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setUserErrorAC(null))
                }, 3000)
            })
}
export const removePackOfCardsTC = (id: string) => (dispatch: any) => {
    packCardsAPI.removePackOfCards(id)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
            setTimeout(() => {
                dispatch(setUserErrorAC(null))
            }, 3000)
        })
}

export const updateNamePackOfCardsTC = (cardsPack: UpdateNameCardPackType) => (dispatch: any) => {
    packCardsAPI.updateNamePackOfCards(cardsPack)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
            setTimeout(() => {
                dispatch(setUserErrorAC(null))
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
                dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setUserErrorAC(null))
                }, 3000)
            })
    }
}