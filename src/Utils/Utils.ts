import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setPackCardsErrorAC} from "../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";
import {setAppErrorAC} from "../n3-redux/a7-AppReducer/AppReducer";
import {setCardsErrorAC} from "../n3-redux/a9-CardsReducer/CardsReducer";


export const errorPackCardsHandler = (e:AxiosError, dispatch: Dispatch) => {
        dispatch(setPackCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
        setTimeout(() => {
            dispatch(setPackCardsErrorAC(null))
        }, 3000)
}

export const errorHandler = (e:AxiosError, dispatch: Dispatch) => {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
        // setTimeout(() => {
        //     dispatch(setAppErrorAC(null))
        // }, 3000)
}

export const errorCardsHandler = (e:AxiosError, dispatch: Dispatch) => {
        dispatch(setCardsErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
        // setTimeout(() => {
        //     dispatch(setCardsErrorAC(null))
        // }, 3000)
}
