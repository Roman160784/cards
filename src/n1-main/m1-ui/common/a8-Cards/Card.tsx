import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Statrs} from "../c7-Stars/Stars";
import {Modal} from "../../../../Utils/Modal/Modal";
import classes from "./Cards.module.css";
import {removeCardTC, updateNameCardTC, uptdateCardsGradeTC} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    question: string
    answer: string
    _id: string
    grade: number
    updated: string
}


export const Card = ({_id, question, answer, grade, updated}: PropsType) => {

    const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);
    const [modalUpdateActive, setModalUpdateActive] = useState<boolean>(false);

    const [questionUpdate, setQuestionUpdate] = useState<string>('')
    const [answerUpdate, setAnswerUpdate] = useState<string>('')

    const dispatch = useDispatch()

    const removeCardHandler = () => {
        dispatch(removeCardTC(_id))
        setModalDeleteActive(false)
    }
    const updateCard = (question: string, answer: string) => {
        dispatch(updateNameCardTC({
            question,
            answer,
            _id
        }))
        setQuestionUpdate('')
        setAnswerUpdate('')
        setModalUpdateActive(false)
    }
    const onCloseModalDeleteHandler = () => {
        setModalDeleteActive(false)
    }

    const onChangeQuestionUpdateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionUpdate(e.currentTarget.value)
    }
    const onChangeAnswerUpdateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerUpdate(e.currentTarget.value)
    }

    const onKeyPressUpdateHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && questionUpdate.trim() !== '' && answerUpdate.trim() !== '') {
            updateCard(questionUpdate, answerUpdate)
        }
    }
    const onCloseModalUpdateHandler = () => {
        setQuestionUpdate('')
        setAnswerUpdate('')
        setModalUpdateActive(false)
    }
    const onClickModalUpdateHandler = () => {
        if (questionUpdate.trim() !== '' && answerUpdate.trim() !== '') {
            updateCard(questionUpdate, answerUpdate)
        }
    }

    const getCardsGrateHandler = (value: number, id: string,) => {
        // dispatch(setSelectedAC(id, value))
        dispatch(uptdateCardsGradeTC(value, id))
    }

    return (
        <>
            <span>{question}</span>
            <span>{answer}</span>
            <Statrs selected={grade > 0} callBack={getCardsGrateHandler} id={_id} value={1}/>
            <Statrs selected={grade > 1.5} callBack={getCardsGrateHandler} id={_id} value={2}/>
            <Statrs selected={grade > 2.5} callBack={getCardsGrateHandler} id={_id} value={3}/>
            <Statrs selected={grade > 3.5} callBack={getCardsGrateHandler} id={_id} value={4}/>
            <Statrs selected={grade > 4.5} callBack={getCardsGrateHandler} id={_id} value={5}/>
            <span>{grade.toFixed(2)}</span>
            <span>{new Date(updated).toLocaleDateString()}</span>
            <button onClick={() => setModalDeleteActive(true)}>del</button>
            <button onClick={() => setModalUpdateActive(true)}>update</button>

            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                <div className={classes.modalTitle}>Delete Card</div>
                <div className={classes.modalDelete}>Do you really want to remove
                    <span className={classes.modalSpanPackName}>{`Card Question - ${question}?`}</span>
                    <br/>
                    All data will be excluded from this card.
                </div>
                <div className={classes.btnModalWrap}>
                    <button className={classes.modalButtonCancel} onClick={removeCardHandler}>delete</button>
                    <button className={classes.modalButtonSave} onClick={onCloseModalDeleteHandler}>cancel</button>
                </div>
            </Modal>

            <Modal active={modalUpdateActive} setActive={setModalUpdateActive}>
                <div className={classes.modalTitle}>Card Info</div>
                <div className={classes.modalInputBox}>
                    <div>
                        <span className={classes.modalSpan}>Question</span>
                        <input
                            value={questionUpdate}
                            onKeyPress={onKeyPressUpdateHandler}
                            onChange={onChangeQuestionUpdateHandler}
                            className={classes.modalInput}
                            placeholder={'Edit your question..'}
                            autoFocus
                        />
                    </div>
                    <div>
                        <span className={classes.modalSpan}>Answer</span>
                        <input
                            value={answerUpdate}
                            onKeyPress={onKeyPressUpdateHandler}
                            onChange={onChangeAnswerUpdateHandler}
                            className={classes.modalInput}
                            placeholder={'Edit your answer...'}
                            autoFocus
                        />
                    </div>
                </div>
                <div className={classes.btnModalWrap}>
                    <button className={classes.modalButtonSave} onClick={onClickModalUpdateHandler}>save</button>
                    <button className={classes.modalButtonCancel} onClick={onCloseModalUpdateHandler}>cancel</button>
                </div>
            </Modal>

        </>
    );
};
