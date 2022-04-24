import React, {ChangeEvent, useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditableSpan} from '../c4-EditableSpan/EditableSpan';
import {RootReducerType} from '../../../../n3-redux/a1-store/store'
import {updateUserTC} from '../../../../n3-redux/a6-ProfileReducer/ProfileReducer';
import {pathEnum} from "../../routes/a0-Main/Main";
import {Navigate} from "react-router-dom";
import {logoutTC} from "../../../../n3-redux/a2-loginReducer/loginReducer";
import classes from "./Profile.module.css"
import {toast} from "react-hot-toast";
import {setAppErrorAC} from "../../../../n3-redux/a7-AppReducer/AppReducer";
import {btoa} from "buffer";


export const Profile = () => {

    const userName = useSelector<RootReducerType, string | null>(state => state.profile.user.name)
    const avatar = useSelector<RootReducerType, string | undefined>(state => state.profile.user.avatar)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLogin)
    const error = useSelector<RootReducerType, string | null>(state => state.app.authError)
    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)

    const changeTitleHandler = (name: string) => {
        dispatch(updateUserTC({name}))
    }
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    const notify = () => {
        if (error) {
            toast.error(error)
            dispatch(setAppErrorAC(null))
        }
    }

    const onChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0]
        if (newFile) {
            const reader = new FileReader()

            // const formData = new FormData()
            //if I need newFile to interim URL
            // const FileURL = window.URL.createObjectURL(newFile)
            //if i need form data
            // formData.append( 'myFile', newFile, newFile.name)

            // if I need newFile Base64
            reader.onloadend = () => {
                if(typeof reader.result === 'string') {
                    const base64String = reader.result
                    dispatch(updateUserTC({avatar: base64String}));
                }
            }
            reader.readAsDataURL(newFile)
        }
    }

    if (!isLoggedIn) {
        return <Navigate to={pathEnum.login}/>
    }

    return (

        <div className={classes.blockProfile}>
            <div className={classes.profileBoxUserName}>
                <div className={classes.profileUser}>
                    <div>
                        {/*<input type="image"*/}
                        {/*       name="image"*/}
                        {/*       alt="img"*/}
                        {/*       src="https://i.pinimg.com/736x/20/5d/95/205d9582975737a8b02fb1e5bbc02fd5.jpg"*/}
                        {/*       width="150"*/}
                        {/*       className={classes.profileImg}*/}

                        {/*/>*/}
                        <div>
                            <img style={{width: '190px', height: '210px'}} className={classes.profileImg}
                                 src={!avatar ? "https://i.pinimg.com/736x/20/5d/95/205d9582975737a8b02fb1e5bbc02fd5.jpg" : avatar}/>
                            <div style={{opacity: '0.5'}}>{`please choose avatar < 2Mb`}</div>
                        </div>
                        <input
                            name="image"
                            ref={inputRef}
                            type="file"
                            style={{display: 'none'}}
                            onChange={onChangePhoto}
                            className={classes.profileImg}
                        />
                        <div>
                            <button className={classes.profileButton}
                                    onClick={() => {
                                        inputRef && inputRef.current && inputRef.current.click()
                                    }}>Choose photo
                            </button>
                        </div>
                    </div>
                    <div className={classes.profileUserName}>
                        <EditableSpan
                            title={userName ? userName : 'User name'}
                            changeTitle={(title: string) => {
                                changeTitleHandler(title)
                            }}/>
                    </div>
                    <div className={classes.textProfile}>Front-end developer</div>
                </div>
                {isLoggedIn && <button onClick={logoutHandler} className={classes.profileButton}>Log out</button>}
            </div>
            {notify()}
        </div>
    )
}