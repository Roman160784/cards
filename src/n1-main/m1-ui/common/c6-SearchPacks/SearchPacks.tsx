import React, {ChangeEvent, useState} from 'react';
import {useDebounce, useUpdateEffect} from 'usehooks-ts'
import { fetchPackCardsTC} from "../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";
import {useDispatch } from "react-redux";
import classes from './SearchPacks.module.css'


export type SearchPacksPropsType = {}


export const SearchPacks = ({...props}: SearchPacksPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    //
    useUpdateEffect(() => {
        dispatch(fetchPackCardsTC({packName: value, page: 1}))
    }, [debouncedValue])


    return (
        <div>
            <input type="search" value={value}
                   onChange={onChangeHandler}
                   className={classes.searchInput}
                   placeholder={'Search...'}
            />
        </div>
    )
}