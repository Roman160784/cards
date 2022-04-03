import {Dispatch} from "redux";

export type LoginReducerType = {
    email: string
    password: string
    rememberMe?: boolean
}

const initialState: LoginReducerType = {
    email: "relt@gmail.com",
    password: "wrTsPeIslmkdrka",
    rememberMe: true
}

export const LoginReducer = (state: LoginReducerType = initialState, action: MainActionType): LoginReducerType => {
    switch (action.type) {
        case "SET-LOGIN": {
            return {...state, email: action.email, password: action.password}
        }
        default:
            return {...state}
    }
}

export const setLoginAC = (email: string,password:string) =>
    ({type: 'SET-LOGIN', email,password})

export const loginTC = (email:string,password:string) => (dispatch: Dispatch) => {
    authLoginAPI.login(email,password)
        .then((res:any) => {
                dispatch(setLoginAC(email,password))
        })
        .catch((e: AxiosError) => {
           e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log('Error: ', {...e})
        })
}

export type MainActionType = ReturnType<typeof setLoginAC>