import { Dispatch } from "redux"
import { profileAPI } from "../../n4-dal/API/CardsAPI"

// types 
export type userType = {
    name: string
    avatar: string
}

export type ProfileReducerType = {
    user: userType
}

const initialState: ProfileReducerType = {
    user: {
        name: 'User Name',
        avatar: ''
    }
}

//reducer

export const ProfileReducer = (state: ProfileReducerType = initialState, action: MainActionType): ProfileReducerType => {
    switch (action.type) {
        case 'PROFILE/UPDATE-USER': {
            return { ...state, user: action.user }
        }
        default:
            return { ...state }
    }
}

// types for actions

export type MainActionType = setUserNameACtype

export type setUserNameACtype = ReturnType<typeof setUserNameAC>

// actions

export const setUserNameAC = (user: userType) => ({ type: 'PROFILE/UPDATE-USER', user } as const)

//tunks

export const updateUserTC = (user: { name?: string, avatar?: string }) => {
    return (dispatch: Dispatch) => {
        return profileAPI.updateUser(user)
            .then((res) => {
                debugger
            })
    }
}