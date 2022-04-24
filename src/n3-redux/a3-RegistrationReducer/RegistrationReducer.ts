import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { registrationAPI } from "../../n4-dal/API/CardsAPI"
import {errorHandler} from "../../Utils/Utils";

//types

export type userType = {
    email: string
    password: string
    confirmPassword?: string
}

type RegistrationReducerType = {
    registration: boolean
    registrationError: string | null
}

const initialState: RegistrationReducerType = {
    registration: false,
    registrationError: ''
}

//reducer

export const RegistrationReducer = (state: RegistrationReducerType = initialState, action: MainActionType): RegistrationReducerType => {
    switch (action.type) {
        case 'REGISTRATION/ADD-USER': {
            return { ...state, registration: action.success }
        }
        case 'REGISTRATION/REGISTRATION-ERROR' : {
            return {...state, registrationError: action.error}
        }
        default:
            return state
    }
}

// types for actions

export type MainActionType = addUserACtype | registrationErrorACtype

export type addUserACtype = ReturnType<typeof addUserAC>
export type registrationErrorACtype = ReturnType<typeof registrationErrorAC>

//actions

export const addUserAC = (success: boolean) => ({ type: 'REGISTRATION/ADD-USER', success } as const)
export const registrationErrorAC = (error: string | null) => ({ type: 'REGISTRATION/REGISTRATION-ERROR', error } as const)

//thunks

export const addUserTC = (user: userType) => {
    return (dispatch: Dispatch) => {
        registrationAPI.addUser(user)
        .then((res) => {
            if(res.data.addedUser) {
                dispatch(addUserAC(true))   
            }
        })
        .catch((e: AxiosError) => {
            //good method for reading error
            // console.log({...err});
            errorHandler(e, dispatch)
        })
    }
}