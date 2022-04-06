export type ForgotPasswordReducerType = {
    email: string | null
    from: string | null
    message: string | null
}

const initialState: ForgotPasswordReducerType = {
    email: null,
    from: null,
    message: null,
}

export const ForgotPasswordReducer = (state: ForgotPasswordReducerType = initialState, action: MainActionType): ForgotPasswordReducerType => {
    return state
}

export type MainActionType =''