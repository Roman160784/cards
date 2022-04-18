import {Dispatch} from "redux";
import {
    AddCardPackType, CardsPacksType,
    getPackOfCardArgsType,
    NewCardPackResponseType,
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
    newCardsPack: NewCardPackResponseType | {},
    myCards: 'my' | 'all'
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
    newCardsPack: {},
    myCards: 'all'
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
            return {...state, currentPackName: action.currentName}
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




export type setPackCardsACType = ReturnType<typeof setPackCardsAC>
export type setPackCardsErrorACType = ReturnType<typeof setPackCardsErrorAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetTotalCountActionType = ReturnType<typeof setTotalCountAC>
export type searchPacksACType = ReturnType<typeof searchPacksAC>




//actions
export const setPackCardsAC = (cardPacks: CardsPacksType[]) => ({type: 'PACKS/SET-PACK-CARDS', cardPacks} as const)

export const setPackCardsErrorAC = (error: string | null) => ({type: 'PACKS/SET-PACK-CARDS-ERROR', error} as const)
export const setCurrentPageAC = (page: number) => ({type: 'PACKS/SET-CURRENT-PAGE', page} as const)
export const setTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'PACKS/SET-TOTAL-COUNT',
    cardPacksTotalCount
} as const)
export const searchPacksAC = (currentName: string) => ({type: 'PACKS/SEARCH-PACKS-NAME', currentName} as const)



// thunks

export const fetchPackCardsTC = (args?: getPackOfCardArgsType) => {

    return (dispatch: Dispatch, getState: () => RootReducerType) => {

        if (args?.packName !== undefined)
            dispatch(searchPacksAC(args.packName))

        if (args?.page)
            dispatch(setCurrentPageAC(args.page))

        const state = getState()
        const currentPackName = state.cardsPacks.currentPackName
        const payload = currentPackName ? {...args, packName: currentPackName,} : args

        return packCardsAPI.getPackOfCards({...payload, pageCount: 10} || {})
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
export const addPackofCardsTC = (cardsPack: AddCardPackType, userId: string) => (dispatch: any) => {
    packCardsAPI.addPackOfCards(cardsPack)
        .then((res) => {
            dispatch(fetchPackCardsTC({user_id: userId}))
        })
        .catch((e: AxiosError) => {
            errorPackCardsHandler(e, dispatch)
        })
}
export const removePackOfCardsTC = (id: string, userId: string) => (dispatch: any) => {
    packCardsAPI.removePackOfCards(id)
        .then((res) => {
            dispatch(fetchPackCardsTC({user_id: userId}))
        })
        .catch((e: AxiosError) => {
            errorPackCardsHandler(e, dispatch)
        })
}

export const updateNamePackOfCardsTC = (cardsPack: UpdateNameCardPackType, userId: string) => (dispatch: any) => {
    packCardsAPI.updateNamePackOfCards(cardsPack)
        .then((res) => {
            dispatch(fetchPackCardsTC({user_id: userId}))
        })
        .catch((e: AxiosError) => {
            errorPackCardsHandler(e, dispatch)
        })
}

// export const getUsersPacksTC = (pageCount?: number) => {
//     return (dispatch: Dispatch, getState: () => RootReducerType) => {
//
//         return packCardsAPI.getUsersPacks( user_id, pageCount,)
//             .then((res) => {
//                 dispatch(setPackCardsAC(res.data.cardPacks))
//             })
//             .catch((e: AxiosError) => {
//                 errorPackCardsHandler(e, dispatch)
//             })
//     }
// }

