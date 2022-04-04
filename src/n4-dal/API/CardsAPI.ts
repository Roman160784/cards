import axios, { AxiosResponse } from "axios";
import { userType } from "../../n3-redux/a3-RegistrationReducer/RegistrationReducer";



export const instance = axios.create({ 
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true, 
})

//API

export const profileAPI = {
    updateUser(user: updateUserNameType){
        return instance.put< updateUserNameType, AxiosResponse<updateUserResponseType>>('auth/me', user)
    },
}

export const registrationAPI = {
    addUser(user: userType){
        return instance.post< userType, AxiosResponse <AddUserResponseType>>('auth/register', user)
    }
}

// types

export type updateUserResponseType ={
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