import React, {ChangeEvent, useEffect, useState} from 'react';
import { useDebounce } from 'usehooks-ts'
import {searchPacksCardsTC} from "../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";
import {useDispatch} from "react-redux";

export type SearchPacksPropsType = {

}

export const SearchPacks = ({ ...props}: SearchPacksPropsType) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 500)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(searchPacksCardsTC(value))
    }, [debouncedValue])


    return (
        <div>
            <input type="text" value={value} onChange={onChangeHandler}/>
            <span>Search</span>
        </div>
    )
}