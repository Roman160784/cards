import React, {useCallback} from 'react';
import {removeCardTC} from "../../../../../n3-redux/a9-CardsReducer/CardsReducer";

type PropsType = {
    id: string
    question: string
    answer: string
    grade: number
    updated: string
}

export const Card = ({id, question, answer, updated, grade}: PropsType) => {

    const removeCardHandler = useCallback(() => {
        removeCardTC(id)
    }, [])

    return (
        <>
            <span>{question}</span>
            <span>{answer}</span>
            <span>{grade}</span>
            <span>{updated}</span>
            <button onClick={removeCardHandler}>del</button>
            <button>update</button>
        </>
    );
};
