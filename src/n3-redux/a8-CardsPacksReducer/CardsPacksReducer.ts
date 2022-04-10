import {CardsPacksType} from "../../n1-main/m1-ui/common/a7-CardPacks/CardsPacks";
import {Dispatch} from "redux";
import {packCardsAPI} from "../../n4-dal/API/CardsAPI";
import {AxiosError} from "axios";
import {setUserErrorAC} from "../a6-ProfileReducer/ProfileReducer";


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
        case "PACKS/SET-PACK-CARDS": {
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