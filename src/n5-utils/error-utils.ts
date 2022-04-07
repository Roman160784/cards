
import {Dispatch} from "redux";
import {setAppErrorAC, setAppErrorACType} from "../n3-redux/a7-AppReducer/AppReducer";


export type AppErrorType<R = {}> = {
    response: {
        data: {
            error: string
        }
    }
}

export const handleServerNetwork = (e: any, dispatch: Dispatch< setAppErrorACType>) => {
    dispatch(setAppErrorAC(e.response ? e.response.data.error : 'Some error occurred 😠'))
}