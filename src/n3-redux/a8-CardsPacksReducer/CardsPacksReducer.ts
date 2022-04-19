import {Dispatch} from "redux";
import {
    AddCardPackType, CardsPacksType,
    packCardsAPI,
    UpdateNameCardPackType
} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import {setInitializedAC} from "../a7-AppReducer/AppReducer";
import {RootReducerType} from "../a1-store/store";
import {errorPackCardsHandler} from "../../Utils/Utils";


//types


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
    currentPackName: null | string
    myCards: 'my' | 'all'
    sortPacks: string
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
    currentPackName: null,
    myCards: 'all',
    sortPacks: '',
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
        case 'PACKS/SET-CURRENT-PAGE': {
            return {...state, page: action.page}
        }
        case 'PACKS/SET-TOTAL-COUNT': {
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        }
        case 'PACKS/SEARCH-PACKS-NAME' : {
            return {...state, currentPackName: action.currentPackName}
        }
        case 'PACKS/SORT-PACKS' : {
            return {...state, sortPacks: action.sortPacks}
        }
        case 'PACKS/SET-MIN-MAX-CARDS-IN-PACKS' : {
            return {...state, minCardsCount: action.min, maxCardsCount: action.max, page: 1}
        }
        case 'PACKS/SORT-MY-ALL-PACKS' : {
            return {...state, myCards: action.value}
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
    | searchPacksACType
    | sortPacksACType
    | setMinMaxCarsInPacksACType
    | sortAllMyPacksACType


// actions type
export type setPackCardsACType = ReturnType<typeof setPackCardsAC>
export type setPackCardsErrorACType = ReturnType<typeof setPackCardsErrorAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetTotalCountActionType = ReturnType<typeof setTotalCountAC>
export type searchPacksACType = ReturnType<typeof searchPacksAC>
export type sortPacksACType = ReturnType<typeof sortPacksAC>
export type setMinMaxCarsInPacksACType = ReturnType<typeof setMinMaxCarsInPacksAC>
export type sortAllMyPacksACType = ReturnType<typeof sortAllMyPacksAC>

//thunk types

export type fetchPackCardsTCType = ReturnType<typeof fetchPackCardsTC>

//actions
export const setPackCardsAC = (cardPacks: CardsPacksType[]) => ({type: 'PACKS/SET-PACK-CARDS', cardPacks} as const)
export const setPackCardsErrorAC = (error: string | null) => ({type: 'PACKS/SET-PACK-CARDS-ERROR', error} as const)
export const setCurrentPageAC = (page: number) => ({type: 'PACKS/SET-CURRENT-PAGE', page} as const)
export const setTotalCountAC = (cardPacksTotalCount: number) => ({type: 'PACKS/SET-TOTAL-COUNT', cardPacksTotalCount} as const)
export const searchPacksAC = (currentPackName: string) => ({type: 'PACKS/SEARCH-PACKS-NAME', currentPackName,} as const)
export const sortPacksAC = (sortPacks: string) => ({type: 'PACKS/SORT-PACKS', sortPacks} as const)
export const setMinMaxCarsInPacksAC = (min: number, max: number, page: number) => ({type: 'PACKS/SET-MIN-MAX-CARDS-IN-PACKS', min, max, page} as const)
export const sortAllMyPacksAC = (value : 'my' | 'all') => ({type: 'PACKS/SORT-MY-ALL-PACKS', value} as const)

// thunks

export const fetchPackCardsTC = () => {
    return (dispatch: Dispatch, getState: () => RootReducerType) => {

        const state = getState().cardsPacks
        const payload = {
            packName: state.currentPackName || '',
            min: state.minCardsCount || 0,
            max: state.maxCardsCount || 100,
            sortPacks: state.sortPacks,
            page: state.page || 1,
            pageCount: state.pageCount || 10,
            user_id: state.myCards === "my" ? getState().profile.user._id : ''
        }

        return packCardsAPI.getPackOfCards(payload)
            .then((res) => {
                dispatch(setPackCardsAC(res.data.cardPacks))
                dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
            })
            .catch((e: AxiosError) => {
                errorPackCardsHandler(e, dispatch)
            })
            .finally(() => {
                dispatch(setInitializedAC(true))
            })
    }
}
export const addPackofCardsTC = (cardsPack: AddCardPackType) => (dispatch: Dispatch<any>) => {
    packCardsAPI.addPackOfCards(cardsPack)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            errorPackCardsHandler(e, dispatch)
        })
}
export const removePackOfCardsTC = (id: string) => (dispatch: Dispatch<any>) => {
    packCardsAPI.removePackOfCards(id)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            errorPackCardsHandler(e, dispatch)
        })
}

export const updateNamePackOfCardsTC = (cardsPack: UpdateNameCardPackType) => (dispatch: Dispatch<any>) => {
    packCardsAPI.updateNamePackOfCards(cardsPack)
        .then((res) => {
            dispatch(fetchPackCardsTC())
        })
        .catch((e: AxiosError) => {
            errorPackCardsHandler(e, dispatch)
        })
}


