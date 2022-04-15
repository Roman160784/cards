import {Dispatch} from "redux";
import {AddCardPackType, getPackOfCardArgsType, packCardsAPI, UpdateNameCardPackType} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import { setInitializedAC} from "../a7-AppReducer/AppReducer";
import {RootReducerType} from "../a1-store/store";



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
    pageCount: 10,
    token: null,
    tokenDeathTime: null,
    error: null,
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
        case "PACKS/SET-CURRENT-PAGE": {
            return {...state, page: action.page}
        }
        case "PACKS/SET-TOTAL-COUNT": {
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        }

        default:
            return {...state}
    }
}

//actions type
export type MainActionType =
    | setPackCardsACType
    | setPackCardsErrorACType
    | SetCurrentPageActionType
    | SetTotalCountActionType


export type setPackCardsACType = ReturnType<typeof setPackCardsAC>
export type setPackCardsErrorACType = ReturnType<typeof setPackCardsErrorAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetTotalCountActionType = ReturnType<typeof setTotalCountAC>


//actions
export const setPackCardsAC = (cardPacks: CardsPacksType[]) => ({type: 'PACKS/SET-PACK-CARDS', cardPacks} as const)
export const setPackCardsErrorAC = (error: string | null) => ({type: 'PACKS/SET-PACK-CARDS-ERROR', error} as const)
export const setCurrentPageAC = (page: number) => ({type: "PACKS/SET-CURRENT-PAGE", page} as const)
export const setTotalCountAC = (cardPacksTotalCount: number) => ({type: "PACKS/SET-TOTAL-COUNT", cardPacksTotalCount} as const)


// thunks

export const fetchPackCardsTC = (args?: getPackOfCardArgsType ) => {
    return (dispatch: Dispatch) => {
        if(args?.page)
        dispatch(setCurrentPageAC(args.page))
        return packCardsAPI.getPackOfCards(args || {})
            .then((res) => {
                dispatch(setPackCardsAC(res.data.cardPacks))
                dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
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
        return packCardsAPI.searchPacks(value)
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

export const getUsersPacksTC = (pageCount?: number) => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        const allState = getState()
        const profile = allState.profile
        const user = profile.user
        const user_id = user._id
        return packCardsAPI.getUsersPacks( user_id, pageCount,)
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