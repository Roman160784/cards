import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditableSpan} from '../c4-EditableSpan/EditableSpan';
import {RootReducerType} from '../../../../n3-redux/a1-store/store'
import {updateUserTC} from '../../../../n3-redux/a6-ProfileReducer/ProfileReducer';
import {pathEnum} from "../../routes/a0-Main/Main";
import {Navigate} from "react-router-dom";


export const Profile = () => {

    const userName = useSelector<RootReducerType, string | null>(state => state.profile.user.name)

    const dispatch = useDispatch()

    const changeTitleHandler = (name: string) => {
        dispatch(updateUserTC({name}))
    }


    return (
        <div>
            <div>
                <div>
                    <div>Place for photo</div>
                    <div>
                        <EditableSpan title={userName ? userName : 'User name'} changeTitle={(title: string) => {
                            changeTitleHandler(title)
                        }}/>
                    </div>
                    <div>Front-end developer</div>
                </div>
            </div>
        </div>
    )
}