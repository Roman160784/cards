import { AxiosError } from "axios"
import { Dispatch } from "redux"
import {CardPackType, packCardsAPI, profileAPI, ProfileCardPacksType} from "../../n4-dal/API/CardsAPI"
import {setAppErrorAC} from "../a7-AppReducer/AppReducer";

// types 
export type userType = {
    avatar?: string
    created: Date | null
    email: string
    isAdmin: boolean
    name: string | null
    publicCardPacksCount: number
    rememberMe: boolean
    token?: string
    tokenDeathTime?: number
    updated: Date | null
    verified: boolean
    __v?: number
    _id: string
    error?: string
}


export type ProfileReducerType = {
    user: userType
    error: string | null
    cardPacks: ProfileCardPacksType
}

const initialState: ProfileReducerType = {
    user: {
        avatar: '',
        created: null,
        email: '',
        isAdmin: false,
        name: null,
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: null,
        verified: false,
        __v: 0,
        _id: ''
    },
    error: null,
    cardPacks: {
        cardPacks: [
            {
                _id: '',
                user_id: '',
                name: '',
                cardsCount: 0,
                created: new Date(),
                updated: new Date()
            },

        ],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        page: 1,
        pageCount: 1,
        token: '',
        tokenDeathTime: 0
    }
}

//reducer

export const ProfileReducer = (state: ProfileReducerType = initialState, action: MainActionType): ProfileReducerType => {
    switch (action.type) {
        case 'PROFILE/UPDATE-USER': {
            return { ...state, user: action.user }
        }
        case 'PROFILE/SET-USER-ERROR': {
            return {...state, error: action.error}
        }
        // case 'PROFILE/SET-PACK-CARDS': {
        //     return action.cardPack.map(pack => ({...pack}))
        //
        // }
        default:
            return { ...state }
    }
}

// types for actions

export type MainActionType = setUserACtype | setUserErrorACType | setPackCardsACType

export type setUserACtype = ReturnType<typeof setUserAC>
export type setUserErrorACType = ReturnType<typeof setUserErrorAC>
export type setPackCardsACType= ReturnType<typeof setPackCardsAC>

// actions

export const setUserAC = (user: userType) => ({ type: 'PROFILE/UPDATE-USER', user } as const)
export const setUserErrorAC = (error: string | null) => ({ type: 'PROFILE/SET-USER-ERROR', error } as const)
export const setPackCardsAC = (cardPack: CardPackType[]) => ({ type: 'PROFILE/SET-PACK-CARDS', cardPack } as const)


//thunks

export const updateUserTC = (user: { name?: string, avatar?: string }) => {
    return (dispatch: Dispatch) => {
        return profileAPI.updateUser(user)
            .then((res) => {
                dispatch(setUserAC(res.data.updatedUser))
            })
            .catch((e: AxiosError) => {
                dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setUserErrorAC(null))
                }, 3000)
            })
    }
}

export const fetchPackCardsTC = () => {
    return (dispatch: Dispatch) => {
        return packCardsAPI.getPackOfCards()
            .then((res) => {
                dispatch(setPackCardsAC(res.data.cardPacks))
                console.log(res.data)
            })
            .catch((e: AxiosError) => {
                dispatch(setUserErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setUserErrorAC(null))
                }, 3000)
            })
    }
}