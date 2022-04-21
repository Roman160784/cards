import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Stars} from "../c7-Stars/Stars";
import {Modal} from "../../../../Utils/Modal/Modal";
import classes from "./Cards.module.css";
import {removeCardTC, updateNameCardTC, uptdateCardsGradeTC} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {setAppErrorAC} from "../../../../n3-redux/a7-AppReducer/AppReducer";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";

type PropsType = {
    question: string
    answer: string
    _id: string
    grade: number
    updated: string
}


export const Card = ({_id, question, answer, grade, updated}: PropsType) => {

    const error = useSelector<RootReducerType, string | null>(state => state.app.authError)

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
        dispatch(uptdateCardsGradeTC(value, id))
    }
    const notify = () => {
        if(error) {
            toast.error(error)
            dispatch(setAppErrorAC(null))
        }
    }

    return (
        <>
            <span className={classes.textCard}>{question}</span>
            <span className={classes.textCard}>{answer}</span>
            <span className={classes.textCard}>{new Date(updated).toLocaleDateString()}</span>
            <span className={classes.textCard}>{grade.toFixed(2)}</span>
            <div className={classes.textCard}>
                <Stars selected={grade > 0} callBack={getCardsGrateHandler} id={_id} value={1}/>
                <Stars selected={grade > 1.5} callBack={getCardsGrateHandler} id={_id} value={2}/>
                <Stars selected={grade > 2.5} callBack={getCardsGrateHandler} id={_id} value={3}/>
                <Stars selected={grade > 3.5} callBack={getCardsGrateHandler} id={_id} value={4}/>
                <Stars selected={grade > 4.5} callBack={getCardsGrateHandler} id={_id} value={5}/>
            </div>
            <div className={classes.buttonCard}>
                <button onClick={() => setModalDeleteActive(true)} className={classes.btnDel}>del</button>
                <button onClick={() => setModalUpdateActive(true)} className={classes.btnUpdate}>update</button>
            </div>

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
                    <div className={classes.modalInputQuestion}>
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
                    <div className={classes.modalInputAnswer}>
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
            {notify()}
        </>
    );
};
