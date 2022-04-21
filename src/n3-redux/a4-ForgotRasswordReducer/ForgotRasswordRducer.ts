import {passwordAPI, PasswordType} from "../../n4-dal/API/CardsAPI";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

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
       case 'FORGOT-PASSWORD/SET-NOTIFICATION': {
           return {...state, message: action.info}
       }
       default:
           return { ...state }
   }
}

// types for actions
export type MainActionType = setErrorMessageACtype | setNotificationACType

export type setErrorMessageACtype = ReturnType<typeof setErrorMessageAC>
export type setNotificationACType = ReturnType<typeof setNotificationAC>


// actions
export const setErrorMessageAC = (error: string | null) => ({type: 'FORGOT-PASSWORD/SETT-ERROR-MESSAGE',  error} as const)
export const setNotificationAC = (info: string | null) => ({type: 'FORGOT-PASSWORD/SET-NOTIFICATION', info} as const)

//thunks
export const getParamsForNewPasswordTC = (data: PasswordType) => {
    return (dispatch: Dispatch) => {
        return passwordAPI.forgotPassword(data)
            .then((res) => {
                dispatch(setNotificationAC(res.data.info))
            })
            .then(() => {
                setTimeout(() => {
                    dispatch(setNotificationAC(null))
                }, 3000)
            })
            .catch((e: AxiosError) => {
                dispatch(setErrorMessageAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
                setTimeout(() => {
                    dispatch(setErrorMessageAC(null))
                }, 3000)
            } )
    }

}














