import {passwordAPI, PasswordType} from "../../n4-dal/API/CardsAPI";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {handleServerNetwork} from "../../n5-utils/error-utils";
import { Navigate } from "react-router-dom"
// types
export type ForgotPasswordReducerType = {
    email: string | null
    from: string | null
    message: string | null
    error: string | null
}

const initialState: ForgotPasswordReducerType = {
    email: null,
    from: null,
    message: null,
    error: null
}
//reducer
export const ForgotPasswordReducer = (state: ForgotPasswordReducerType = initialState, action: MainActionType): ForgotPasswordReducerType => {
   switch (action.type) {
       case 'FORGOT-PASSWORD/SETT-ERROR-MESSAGE' : {
           return {...state, error: action.error}
       }
       default:
           return { ...state }
   }
}

// types for actions
export type MainActionType = setErrorMessageACtype

export type setErrorMessageACtype = ReturnType<typeof setErrorMessageAC>

// actions
export const setErrorMessageAC = (error: string) => ({type: 'FORGOT-PASSWORD/SETT-ERROR-MESSAGE',  error} as const)


//thunks
export const getParamsForNewPasswordTC = (data: PasswordType) => {
    return (dispatch: Dispatch) => {
        return passwordAPI.forgotPassword(data)
            .then((res) => {
                
            })
            .catch((e: AxiosError) => {
                handleServerNetwork(e, dispatch)
            } )
    }

}














