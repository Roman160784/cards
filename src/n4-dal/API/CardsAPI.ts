import axios, { AxiosResponse } from "axios";
import { userType } from "../../n3-redux/a3-RegistrationReducer/RegistrationReducer";
import { LoginType } from "../../n3-redux/a2-loginReducer/loginReducer";



// baseURL for herocu https://neko-back.herokuapp.com/2.0
// baseURL for  http://localhost:7542/2.0/

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

//API

export const authAPI = {
    me() {
        return instance.post<LoginResponseType>('auth/me')
    }
}

export const authLoginAPI = {
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<LoginResponseType>>('auth/login', data)
    }
}
export const authLogoutAPI = {
    logout() {
        return instance.delete<LogoutResponseType>('auth/me')
    }
}

export const profileAPI = {
    updateUser(user: UserRequestType) {
        return instance.put<UserRequestType, AxiosResponse<updateUserResponseType>>('auth/me', user)
    },
}

export const registrationAPI = {
    addUser(user: userType) {
        return instance.post<userType, AxiosResponse<AddUserResponseType>>('auth/register', user)
    }
}

export const passwordAPI = {
    forgotPassword(data : PasswordType) {
        return instance.post<PasswordType, AxiosResponse<PasswordResponseType> >('auth/forgot', data)
    }
}

// types

export type PasswordType = {
    email: string
    from: string
    message: string
}

export type PasswordResponseType = {
    info: string
    error?: string
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
export type LogoutResponseType = {
    info: string
    error?: string
}

export type UserRequestType = {
    name?: string
    avatar?: string
}

export type updateUserResponseType = {
    updatedUser: updateUserType
    error?: string
}

export type updateUserType = {
    avatar: string
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Date
    verified: boolean
    __v: number
    _id: string
}

export type AddUserResponseType = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
    }
}