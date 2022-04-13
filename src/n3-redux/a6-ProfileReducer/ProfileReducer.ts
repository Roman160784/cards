import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { profileAPI} from "../../n4-dal/API/CardsAPI"

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
    // cardPacks: ProfileCardPacksType
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
        default:
            return { ...state }
    }
}

// types for actions

export type MainActionType = setUserACtype | setUserErrorACType

export type setUserACtype = ReturnType<typeof setUserAC>
export type setUserErrorACType = ReturnType<typeof setUserErrorAC>


// actions

export const setUserAC = (user: userType) => ({ type: 'PROFILE/UPDATE-USER', user } as const)
export const setUserErrorAC = (error: string | null) => ({ type: 'PROFILE/SET-USER-ERROR', error } as const)



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

