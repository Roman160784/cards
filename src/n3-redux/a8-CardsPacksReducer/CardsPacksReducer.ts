import {Dispatch} from "redux";
import {AddCardPackType, packCardsAPI, UpdateNameCardPackType} from "../../n4-dal/API/CardsAPI";
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
        case 'PACKS/SOTR-MIN-PACK-CARDS' : {
            const sort = state.cardsPacks.sort((a, b) => a.cardsCount - b.cardsCount)
            return {...state, cardsPacks: [...sort]}
        }
        case 'PACKS/SOTR-MAX-PACK-CARDS' : {
            const sort = state.cardsPacks.sort((a, b) => b.cardsCount - a.cardsCount)
            return {...state, cardsPacks: [...sort]}
        }

        default:
            return {...state}
    }
}

//actions type
export type MainActionType = setPackCardsACType | setPackCardsErrorACType | sortMinCardsInPackACType | sortMaxCardsInPackACType

export type setPackCardsACType = ReturnType<typeof setPackCardsAC>
export type setPackCardsErrorACType = ReturnType<typeof setPackCardsErrorAC>
export type sortMinCardsInPackACType = ReturnType<typeof sortMinCardsInPackAC>
export type sortMaxCardsInPackACType = ReturnType<typeof sortMaxCardsInPackAC>

//actions
export const setPackCardsAC = (cardPacks: CardsPacksType[]) => ({type: 'PACKS/SET-PACK-CARDS', cardPacks} as const)
export const setPackCardsErrorAC = (error: string | null) => ({type: 'PACKS/SET-PACK-CARDS-ERROR', error} as const)
export const sortMinCardsInPackAC = () => ({type: 'PACKS/SOTR-MIN-PACK-CARDS'} as const)
export const sortMaxCardsInPackAC = () => ({type: 'PACKS/SOTR-MAX-PACK-CARDS'} as const)



// thunks

export const fetchPackCardsTC = () => {
    return (dispatch: Dispatch) => {
        return packCardsAPI.getPackOfCards()
            .then((res) => {
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

export const getUsersPacksTC = () => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {
        const allState = getState()
        const profile = allState.profile
        const user = profile.user
        const user_id = user._id
        return packCardsAPI.getUsersPacks(user_id)
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