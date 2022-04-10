import React, {ChangeEvent, useState} from 'react';
import { CardsPacksType } from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';

export type SearchType = {
    searchArray: CardsPacksType[]
}

export const Search = ({searchArray, ...props}: SearchType) => {

    const [value, setValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    searchArray.filter(arr => {
        return arr.name.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div>
            <input type="text" value={value} onChange={onChangeHandler} />
            <span>Search</span>
        </div>
    )
}