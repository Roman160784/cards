import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { appAPI, LoginResponseType } from "../../n4-dal/API/CardsAPI"
import { setIsLoginAC } from "../a2-loginReducer/loginReducer"
import { setUserAC } from "../a6-ProfileReducer/ProfileReducer"

// types 
export type AppReducerType = {
    auth: boolean
    authError: string | null
    loading: boolean
    initialised: boolean
}


//state
const initialState: AppReducerType = {
    auth: false,
    authError: null,
    loading: false,
    initialised: false,
}

//reducer
export const AppReducer = (state: AppReducerType = initialState, action: MainActionType): AppReducerType => {
    switch (action.type) {

        case 'APP/IS-AUTH': {
            return { ...state, auth: action.auth }
        }
        case 'APP/LOADING': {
            return { ...state, loading: action.loading }
        }
        case 'APP/SET-INITIALISE' : {
            return{ ...state, initialised: action.initialised }
        }
        default:
            return { ...state }
    }
}


// types for actions

export type MainActionType = isAuthACtype | setLoadingACtype | setInitialisegACtype

export type isAuthACtype = ReturnType<typeof isAuthAC>
export type setLoadingACtype = ReturnType<typeof setLoadingAC>
export type setInitialisegACtype = ReturnType<typeof setInitialisedAC>

// actions

export const isAuthAC = (auth: boolean) => ({ type: 'APP/IS-AUTH', auth } as const)
export const setLoadingAC = (loading: boolean) => ({ type: 'APP/LOADING', loading } as const)
export const setInitialisedAC = (initialised: boolean) => ({ type: 'APP/SET-INITIALISE', initialised } as const)


//tunks

export const isAuthTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true))
        return appAPI.me()
            .then((res) => {
                dispatch(setUserAC(res.data))
                dispatch(isAuthAC(true))
                dispatch(setIsLoginAC(true))
            })
            .catch((err: AxiosError) => {
                dispatch(setIsLoginAC(false))
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
                dispatch(setInitialisedAC(true))
            })
    }
}