import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authLoginAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<LoginResponseType>>('auth/login', data)
    }
}

export const profileAPI = {
    updateUserName(user: updateUserNameType) {
        return instance.put<updateUserNameType, AxiosResponse<updateUserNameResponseType>>('auth/me', user)
    },
}

// types

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type updateUserNameResponseType = {
    updatedUser: updateUserNameType
    error?: string
}

export type updateUserNameType = {
    name?: string
    avatar?: string
}