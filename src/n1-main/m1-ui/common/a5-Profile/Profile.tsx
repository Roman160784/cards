import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditableSpan } from '../c4-EditableSpan/EditableSpan';
import {RootReducerType} from '../../../../n3-redux/a1-store/store'
import { setUserNameAC } from '../../../../n3-redux/a6-ProfileReducer/ProfileReducer';



export const Profile = () => {

    const dispatch = useDispatch()
    const userName = useSelector<RootReducerType, string>(state => state.profile.userName)

const changeTitleHandler = (title: string) => {
    dispatch(setUserNameAC(title))
}

    return (
        <div>
            <div>
                <div>
                    <div>Place for photo</div>
                    <div>
                        <EditableSpan title={userName} changeTitle={(title: string) => {changeTitleHandler(title)}} />
                    </div>
                    <div>Front-end developer</div>
                </div>
            </div>
        </div>
    )
}