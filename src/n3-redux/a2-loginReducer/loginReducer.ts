import {Dispatch} from "redux";
import {AxiosError} from "axios"
import {authLoginAPI} from "../../n4-dal/API/CardsAPI";
import {Simulate} from "react-dom/test-utils";

export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type LoginReducerType = {
    data: LoginType
    isLogin: boolean
    error: string | null
}

const initialState: LoginReducerType = {
    data: {
        email: "",
        password: "",
    },
    isLogin: false,
    error: null,
}

export const LoginReducer = (state: LoginReducerType = initialState, action: MainActionType): LoginReducerType => {
    switch (action.type) {
        case "LOGIN/SET-LOGIN": {
            return {...state, data: action.data}
        }
        case "LOGIN/SET-IS-LOGIN": {
            return {...state, isLogin: action.isLogin}
        }
        case "LOGIN/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}

export type MainActionType = ReturnType<typeof setLoginAC> | ReturnType<typeof setIsLoginAC> | ReturnType<typeof setLoginErrorAC>

export const setLoginAC = (data: LoginType) =>
    ({type: 'LOGIN/SET-LOGIN', data} as const)

export const setIsLoginAC = (isLogin: boolean) =>
    ({type: 'LOGIN/SET-IS-LOGIN', isLogin} as const)

export const setLoginErrorAC = (error: string | null) =>
    ({type: 'LOGIN/SET-ERROR', error} as const)

export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
    authLoginAPI.login(data)
        .then((res) => {
            if (res.data) {
                dispatch(setLoginAC(data))
                dispatch(setIsLoginAC(true))
            }
        })
        .catch((e: AxiosError) => {
           dispatch(setLoginErrorAC( e.response ? e.response.data.error : (e.message + ', more details in the console')))
            console.log('Error: ', {...e})
        })
}

