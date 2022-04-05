import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {LoginReducer} from "../a2-loginReducer/loginReducer";
import {RegistrtionReducer} from "../a3-RegistrationReducer/RegistrationReducer";
import {RestoreRasswordReducer} from "../a4-RestoreRasswordReducer/RestoreRasswordRducer";
import {NewRasswordReducer} from "../a5-NewRasswordReducer/NewRasswordRducer";
import {ProfileReducer} from "../a6-ProfileReducer/ProfileReducer";
import { AppReducer } from "../a7-AppReducer/AppReducer";


const rootReducer = combineReducers({
    login: LoginReducer,
    registration: RegistrtionReducer,
    restorePassword: RestoreRasswordReducer,
    newPassword: NewRasswordReducer,
    profile: ProfileReducer,
    app: AppReducer,

})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store;