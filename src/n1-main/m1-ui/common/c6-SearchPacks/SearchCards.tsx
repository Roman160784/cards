import React, {ChangeEvent, useState} from 'react';
import {useDebounce, useUpdateEffect} from 'usehooks-ts'
import {useDispatch} from "react-redux";
import {
    searchCardsAnswerAC, searchCardsQuestionAC,
    setCurrentPageCardsAC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import classes from './SearchPacks.module.css'

export type SearchPacksPropsType = {
    cardsPack_id: string
}

export const SearchCards = ({cardsPack_id, ...props}: SearchPacksPropsType) => {

    const dispatch = useDispatch()
    const [answer, setAnswer] = useState<string>('')
    const [question, setQuestion] = useState('')
    const debouncedQuestion = useDebounce<string>(question, 1500)
    const debouncedAnswer = useDebounce<string>(answer, 1500)

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setAnswer(e.currentTarget.value)
    }

    useUpdateEffect(() => {
        dispatch(searchCardsAnswerAC(answer))
        dispatch(setCurrentPageCardsAC(1))
    }, [debouncedAnswer])

    useUpdateEffect(() => {
        dispatch(searchCardsQuestionAC(question))
        dispatch(setCurrentPageCardsAC(1))
    }, [debouncedQuestion])


    return (
        <div>
            <div>
            <input type="search"
                   placeholder={'Search... question'}
                   value={question}
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