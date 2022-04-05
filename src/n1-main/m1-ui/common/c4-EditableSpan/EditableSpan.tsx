import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootReducerType } from '../../../../n3-redux/a1-store/store';
import { pathEnum } from '../../routes/a0-Main/Main';


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
            setError('Incorerct User Name')
        } 
    }

    return (
        <div>
            {mode
                ? <input type="text" value={value} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus />
                : <span onDoubleClick={() => {setMode(true)}}>{title}</span>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={{ opacity: '0.5' }}>dobble click for change user name</div>
        </div>

    )

}