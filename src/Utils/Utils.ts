import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppErrorAC} from "../n3-redux/a7-AppReducer/AppReducer";




export const errorHandler = (e:AxiosError, dispatch: Dispatch) => {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
}

