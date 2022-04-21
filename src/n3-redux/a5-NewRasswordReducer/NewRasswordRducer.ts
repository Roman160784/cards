import {passwordAPI, SetPasswordType} from "../../n4-dal/API/CardsAPI";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

export type NewPasswordReducerType = {
    info: string | null
    error: string | null
}

const initialState: NewPasswordReducerType = {
    info: null,
    error: null
}

export const NewPasswordReducer = (state: NewPasswordReducerType = initialState, action: ActionTypes): NewPasswordReducerType => {
    switch (action.type) {
        case 'NEW-PASSWORD/SET-NOTIFICATION': {
            return {...state, info: action.info}
        }
        case 'NEW-PASSWORD/SET-ERROR-MESSAGE': {
            return {...state, error: action.error}
        }
    }

    return state
}

export type ActionTypes = setErrorMessageACtype | setNotificationACType

export type setErrorMessageACtype = ReturnType<typeof setErrorMessageAC>
export type setNotificationACType = ReturnType<typeof setNotificationAC>


export const setErrorMessageAC = (error: string | null) => ({type: 'NEW-PASSWORD/SET-ERROR-MESSAGE',  error} as const)
export const setNotificationAC = (info: string | null) => ({type: 'NEW-PASSWORD/SET-NOTIFICATION', info} as const)


export const setNewPasswordTC = (data: SetPasswordType) => {
    return (dispatch: Dispatch) => {
        return passwordAPI.setNewPassword(data)
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