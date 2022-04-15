import axios, {AxiosResponse} from "axios";
import {userType} from "../../n3-redux/a3-RegistrationReducer/RegistrationReducer";
import {LoginType} from "../../n3-redux/a2-loginReducer/loginReducer";
import {CardsPacksType} from "../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";


// baseURL for herocu https://neko-back.herokuapp.com/2.0/
// baseURL   http://localhost:7542/2.0/

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
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
    forgotPassword(data: PasswordType) {
        return instance.post<PasswordType, AxiosResponse<PasswordResponseType>>('auth/forgot', data)
    },
    setNewPassword(data: SetPasswordType) {
        return instance.post<SetPasswordType, AxiosResponse<PasswordResponseType>>('/auth/set-new-password', data)
    }
}

export type getPackOfCardArgsType = {
    min?: number, max?: number, sortPacks?: string, page?: number, pageCount?: number
}
export const packCardsAPI = {
    getPackOfCards(args : getPackOfCardArgsType) {
        console.log({...args})
        return instance.get<CardPacksResponseType>(`/cards/pack`, {params: {...args}})
    },
    addPackOfCards(cardsPack: AddCardPackType) {
        return instance.post<AddCardPackType, AxiosResponse<AddPackOfCardsResponseType>>('cards/pack', {cardsPack: {name: cardsPack.name}})
    },
    removePackOfCards(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updateNamePackOfCards(cardsPack: UpdateNameCardPackType) {
        return instance.put('/cards/pack', {cardsPack})
    },
    searchPacks(packName?: string) {
        return instance.get<CardPacksResponseType>(`/cards/pack?packName=${packName}`)
    },
    getUsersPacks( user_id: string, pageCount?: number,) {
        return instance.get<CardPacksResponseType>('/cards/pack', {params:{pageCount, user_id}})
    }
}

export const cardsApi = {
    getCards(cardsPack_id: string,) {
        return instance.get<CardsResponseType>(`/cards/card`, {params:{cardsPack_id,}} )
    },
    removeCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    createCard(cardsPack_id: string) {
        return instance.post<CardType>('/cards/card', {card:{cardsPack_id}})
    },
    updateNameCard(_id: string) {
        return instance.put('/cards/card', {card:{_id}})
    },
    searchCards(cardsPack_id: string, cardAnswer: string) {
        return instance.get<CardsResponseType>(`/cards/card`, {params: {cardAnswer, cardsPack_id}})
    }
}
// types

export type CardsResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    token: string
    tokenDeathTime: number
}
export type CardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type CardPacksResponseType = {
    cardPacks: CardsPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type AddCardPackType = {
    name: string
    private?: boolean
    deckCover?: string
}
export type UpdateNameCardPackType = {
    _id: string
    name: string
}

export type AddPackOfCardsResponseType = {
    cardsCount: number
    created: Date
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type PasswordType = {
    email: string
    from: string | null
    message: string | null
}
export type SetPasswordType = {
    password: string
    resetPasswordToken: string | undefined
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