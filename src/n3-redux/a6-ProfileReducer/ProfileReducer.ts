import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { profileAPI } from "../../n4-dal/API/CardsAPI"
import { setIsLoginAC } from "../a2-loginReducer/loginReducer"

// types 
export type userType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string | null
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export type ProfileReducerType = {
    user: userType
}

const initialState: ProfileReducerType = {
    user: {
        avatar: '',
        created: '',
        email: '',
        isAdmin: false,
        name: null,
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: ''
    },
   
}

//reducer

export const ProfileReducer = (state: ProfileReducerType = initialState, action: MainActionType): ProfileReducerType => {
    switch (action.type) {
        case 'PROFILE/UPDATE-USER': {
            return  { ...state, user: action.user } 
        }

        default:
            return { ...state }
    }
}

// types for actions

export type MainActionType = setUserACtype 

export type setUserACtype = ReturnType<typeof setUserAC>


// actions

export const setUserAC = (user: userType) => ({ type: 'PROFILE/UPDATE-USER', user } as const)


//tunks

export const updateUserTC = (user: { name?: string, avatar?: string }) => {
    return (dispatch: Dispatch) => {
        return profileAPI.updateUser(user)
            .then((res) => {
                dispatch(setUserAC(res.data.updatedUser))
            })
            .catch((err: AxiosError) => {
                if(err.response?.data.error){
                    dispatch(setIsLoginAC(false))
                }
            })
    }
}