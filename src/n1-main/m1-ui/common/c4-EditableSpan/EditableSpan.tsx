import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootReducerType } from '../../../../n3-redux/a1-store/store';
import { pathEnum } from '../../routes/a0-Main/Main';
import classes from './../a5-Profile/Profile.module.css'


type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({ title, changeTitle, ...props }: EditableSpanPropsType) => {

    const isLogin = useSelector<RootReducerType, boolean>(state => state.login.isLogin)
    
    const navigate = useNavigate()

    const [value, setValue] = useState<string>(title)
    const [mode, setMode] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
        if (!isLogin) navigate(pathEnum.login)
    }

    const onBlurHandler = () => {
        if(value.length > 30){
            setError('max user name 30')
        }
         else if (value.trim() !== '') {
            changeTitle(value)
            setValue('')
            setMode(false)
        }else {
            setError('Incorrect User Name')
        } 
    }

    return (
        <div>
            {mode
                ? <input type="text" value={value} onChange={onChangeHandler}
                         onBlur={onBlurHandler} autoFocus  className={classes.inputName}/>
                : <span onDoubleClick={() => {setMode(true)}}>{title}</span>}
            {error && <div className={classes.error}>{error}</div>}
            <div className={classes.inputClick}>double click for change user name</div>
        </div>

    )

}