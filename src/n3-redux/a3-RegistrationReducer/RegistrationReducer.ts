import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { registrationAPI } from "../../n4-dal/API/CardsAPI"


//types

export type userType = {
    email: string
    password: string
    confirmPassword?: string
}

type RegistrtionReducerType = {
    registration: boolean
    registrationError: string | null
}

const initialState: RegistrtionReducerType = {
    registration: false,
    registrationError: ''
}

//reducer

export const RegistrtionReducer = (state: RegistrtionReducerType = initialState, action: MainActionType): RegistrtionReducerType => {
    switch (action.type) {
        case 'REGISTRATION/ADD-USER': {
            return { ...state, registration: action.success }
        }
        case 'REGISTRATION/REGISTRATION-ERROR' : {
            return {...state, registrationError: action.error}
        }
        default:
            return { ...state}
    }
}

// types for actions

export type MainActionType = addUserACtype | registrationErrorACtype

export type addUserACtype = ReturnType<typeof addUserAC>
export type registrationErrorACtype = ReturnType<typeof registrationErrorAC>

//actions

export const addUserAC = (success: boolean) => ({ type: 'REGISTRATION/ADD-USER', success } as const)
export const registrationErrorAC = (error: string | null) => ({ type: 'REGISTRATION/REGISTRATION-ERROR', error } as const)

//tunks

export const addUserTC = (user: userType) => {
    return (dispatch: Dispatch) => {
        registrationAPI.addUser(user)
        .then((res) => {
            if(res.data.addedUser) {
                dispatch(addUserAC(true))   
            }
        })
        .catch((err: AxiosError) => {
            //good method for reading error
            // console.log({...err});
            dispatch(registrationErrorAC(err.response?.data.error)) 
        })
    }
}