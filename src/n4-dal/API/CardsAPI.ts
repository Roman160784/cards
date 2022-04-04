import axios, {AxiosResponse} from "axios";
import {userType} from "../../n3-redux/a3-RegistrationReducer/RegistrationReducer";
import {LoginType} from "../../n3-redux/a2-loginReducer/loginReducer";


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

//API
export const authLoginAPI = {
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<LoginResponseType>>('auth/login', data)
    }
}

export const profileAPI = {
    updateUser(user: updateUserNameType) {
        return instance.put<updateUserNameType, AxiosResponse<updateUserResponseType>>('auth/me', user)
    },
}

export const registrationAPI = {
    addUser(user: userType) {
        return instance.post<userType, AxiosResponse<AddUserResponseType>>('auth/register', user)
    }
}

// types
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

export type updateUserResponseType = {
    updatedUser: updateUserNameType
    error?: string
}

export type updateUserNameType = {
    name?: string
    avatar?: string
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