import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {LoginReducer} from "../a2-loginReducer/loginReducer";
import {RegistrationReducer} from "../a3-RegistrationReducer/RegistrationReducer";
import {ForgotPasswordReducer} from "../a4-ForgotRasswordReducer/ForgotRasswordRducer";
import {NewPasswordReducer} from "../a5-NewRasswordReducer/NewRasswordRducer";
import {ProfileReducer} from "../a6-ProfileReducer/ProfileReducer";
import { AppReducer } from "../a7-AppReducer/AppReducer";
import {CardsPacksReducer} from "../a8-CardsPacksReducer/CardsPacksReducer";
import {CardsReducer} from "../a9-CardsReducer/CardsReducer";



const rootReducer = combineReducers({
    login: LoginReducer,
    registration: RegistrationReducer,
    forgotPassword: ForgotPasswordReducer,
    newPassword: NewPasswordReducer,
    profile: ProfileReducer,
    app: AppReducer,
    cardsPacks: CardsPacksReducer,
    cards: CardsReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store;