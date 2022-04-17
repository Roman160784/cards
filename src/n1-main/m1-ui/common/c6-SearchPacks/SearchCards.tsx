import React, {ChangeEvent, useState} from 'react';
import {useDebounce, useUpdateEffect} from 'usehooks-ts'
import {useDispatch} from "react-redux";
import {getCardsTC} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import classes from './SearchPacks.module.css'

export type SearchPacksPropsType = {
    cardsPack_id: string
}

export const SearchCards = ({cardsPack_id, ...props}: SearchPacksPropsType) => {

    const dispatch = useDispatch()
    const [answer, setAnswer] = useState<string>('')
    const [value, setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 1000)
    const debouncedAnswer = useDebounce<string>(answer, 1000)

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    useUpdateEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardsPack_id, cardQuestion: value, page: 1}))
    }, [debouncedValue])

    useUpdateEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardsPack_id, cardAnswer: answer, page: 1}))
    }, [debouncedAnswer])


    return (
        <div>
            <div>
            <input type="search"
                   placeholder={'Search... question'}
                   value={value}
                   onChange={onChangeQuestionHandler}
                   className={classes.fieldSearch}
            />
            </div>
            <div>
                <input type="search"
                       placeholder={'Search... answer'}
                       value={answer}
                       onChange={onChangeAnswerHandler}
                       className={classes.fieldSearch}
                />
            </div>
        </div>
    )
}