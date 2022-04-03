import {Dispatch} from "redux";
import { AxiosError } from "axios"
import {authLoginAPI} from "../../n4-dal/API/CardsAPI";

export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type LoginReducerType = {
    data: LoginType
}

const initialState: LoginReducerType = {
    data: {
        email: "",
        password: "",
    }
}

export const LoginReducer = (state: LoginReducerType = initialState, action: MainActionType): LoginReducerType => {
    switch (action.type) {
        case "SET-LOGIN": {
            return {...state, data: action.data}
        }
        default:
            return {...state}
    }
}

export const setLoginAC = (data: LoginType) =>
    ({type: 'SET-LOGIN', data})

export const loginTC = (data:LoginType) => (dispatch: Dispatch) => {
    debugger
    authLoginAPI.login(data)
        .then((res) => {
                dispatch(setLoginAC(data))
        })
        .catch((e: AxiosError) => {
          const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log('Error: ', {...e})
            console.log(error)
        })
}

export type MainActionType = ReturnType<typeof setLoginAC>