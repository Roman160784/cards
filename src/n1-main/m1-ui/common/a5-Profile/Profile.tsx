import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditableSpan} from '../c4-EditableSpan/EditableSpan';
import {RootReducerType} from '../../../../n3-redux/a1-store/store'
import {updateUserTC} from '../../../../n3-redux/a6-ProfileReducer/ProfileReducer';
import {pathEnum} from "../../routes/a0-Main/Main";
import {Navigate} from "react-router-dom";
import {logoutTC} from "../../../../n3-redux/a2-loginReducer/loginReducer";


export const Profile = () => {

    const userName = useSelector<RootReducerType, string | null>(state => state.profile.user.name)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLogin)
    const dispatch = useDispatch()

    const changeTitleHandler = (name: string) => {
        dispatch(updateUserTC({name}))
    }
    const logoutHandler = useCallback(() =>{
        dispatch(logoutTC())
    }, [])

    if(!isLoggedIn) {
        return <Navigate to={pathEnum.login}/>
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
                {isLoggedIn && <button onClick={logoutHandler}>Log out</button>}
            </div>
        </div>
    )
}