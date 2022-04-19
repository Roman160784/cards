import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../../../n3-redux/a1-store/store";
import {useNavigate} from "react-router-dom";
import {pathEnum} from "../../../routes/a0-Main/Main";
import classes from './Modal.module.css'

type PropsType = {
    addItem: (title: string) => void;
    title: string
    isOpened: boolean
    onModalClose: () => void
}


export const Modal = ({addItem, isOpened, title, onModalClose}: PropsType) => {
    const isLogin = useSelector<RootReducerType, boolean>(state => state.login.isLogin)

    const navigate = useNavigate()

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
        if (!isLogin) navigate(pathEnum.login)
    }

    const addPackHandler = () => {
        if (value.length > 30) {
            setError('max user name 30')
        } else if (value.trim() !== '') {
            addItem(value)
            setValue('')
            onModalClose()
        } else {
            setError('Incorerct User Name')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addPackHandler();
        }
    }

    return (
        <div className={`${classes.wrapperModal} ${isOpened ? classes.open : classes.close}`} onClick={onModalClose}>
            <div className={classes.modalBody} onClick={e => e.stopPropagation()}>
                <div className={classes.modalClose} onClick={onModalClose}>x</div>
                <h2>{title}</h2>
                <input
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={addPackHandler}
                    onKeyPress={onKeyPressHandler}
                    autoFocus
                    className={classes.inputName}
                />
                {error && <div className={classes.error}>{error}</div>}
                <button className={classes.btnSave} onClick={addPackHandler}>Save</button>
            </div>
        </div>
    )
};

