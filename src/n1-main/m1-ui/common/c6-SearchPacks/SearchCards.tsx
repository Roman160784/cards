import React, {ChangeEvent, useState} from 'react';
import {useDebounce, useUpdateEffect} from 'usehooks-ts'
import {useDispatch} from "react-redux";
import {searchCardsTC} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import classes from './SearchPacks.module.css'

export type SearchPacksPropsType = {
    cardsPack_id: string
}

export const SearchCards = ({cardsPack_id, ...props}: SearchPacksPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    useUpdateEffect(() => {
        dispatch(searchCardsTC(cardsPack_id,value))
    }, [debouncedValue])


    return (
        <div>
            <input type="search"
                   placeholder={'Search...'}
                   value={value}
                   onChange={onChangeHandler}
                   className={classes.fieldSearch}
            />
        </div>
    )
}