import axios, { AxiosResponse } from "axios";



export const instance = axios.create({ 
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true, 
})

export const profileAPI = {
    updateUserName(user: updateUserNameType){
        return instance.put< updateUserNameType, AxiosResponse<updateUserNameResponseType>>('auth/me', user)
    },
}

// types

export type updateUserNameResponseType ={
    updatedUser: updateUserNameType
    error?: string
}

export type updateUserNameType = {
    name?: string
    avatar?: string
}