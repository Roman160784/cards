export type ProfileReducerType = {
    userName: string
}

const initialState: ProfileReducerType = {
    userName: 'User name'
}

export const ProfileReducer = (state: ProfileReducerType = initialState, action: MainActionType): ProfileReducerType => {
    switch(action.type) {
        case 'PROFILE/SET-USER-NAME': {
            return {...state, userName: action.userName}
        }
    }
    return state
}

export type MainActionType = setUserNameACtype

export type setUserNameACtype = ReturnType<typeof setUserNameAC>

export const setUserNameAC = (userName: string) => ({type: 'PROFILE/SET-USER-NAME', userName} as const)