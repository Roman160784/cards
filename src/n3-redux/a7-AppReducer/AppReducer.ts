import {AxiosError} from "axios"
import {Dispatch} from "redux"
import {authAPI} from "../../n4-dal/API/CardsAPI"
import {setIsLoginAC} from "../a2-loginReducer/loginReducer"
import {setUserAC} from "../a6-ProfileReducer/ProfileReducer"
import {handleServerNetwork} from "../../n5-utils/error-utils";

// types
export type AppReducerType = {
    auth: boolean
    authError: string | null
    loading: boolean
    initialized: boolean
}


//state
const initialState: AppReducerType = {
    auth: false,
    authError: null,
    loading: false,
    initialized: false,
}

//reducer
export const AppReducer = (state: AppReducerType = initialState, action: MainActionType): AppReducerType => {
    switch (action.type) {
        case "APP/SET-ERROR": {
            return {...state, authError: action.authError}
        }
        case 'APP/IS-AUTH': {
            return {...state, auth: action.auth}
        }
        case 'APP/LOADING': {
            return {...state, loading: action.loading}
        }
        case 'APP/SET-INITIALIZE' : {
            return {...state, initialized: action.initialized}
        }
        default:
            return {...state}
    }
}


// types for actions

export type MainActionType = isAuthACtype | setLoadingACtype | setInitializedACtype | setAppErrorACType


export type isAuthACtype = ReturnType<typeof isAuthAC>
export type setLoadingACtype = ReturnType<typeof setLoadingAC>
export type setInitializedACtype = ReturnType<typeof setInitializedAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

// actions

export const isAuthAC = (auth: boolean) => ({type: 'APP/IS-AUTH', auth} as const)
export const setLoadingAC = (loading: boolean) => ({type: 'APP/LOADING', loading} as const)
export const setInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZE', initialized} as const)
export const setAppErrorAC = (authError: string | null) => ({type: 'APP/SET-ERROR', authError} as const)


//thunks

export const isAuthTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true))
        return authAPI.me()
            .then((res) => {
                dispatch(setUserAC(res.data))
                dispatch(isAuthAC(true))
                dispatch(setIsLoginAC(true))
            })
            .catch((e: AxiosError) => {
                dispatch(setIsLoginAC(false))
                handleServerNetwork(e, dispatch)
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
                dispatch(setInitializedAC(true))
            })
    }
}
