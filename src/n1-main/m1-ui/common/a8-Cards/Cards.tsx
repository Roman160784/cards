import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {useNavigate, useParams} from "react-router-dom";
import {
    CardsReducerType,
    setSelectedAC,
    createCardTC, getCardsTC,
    removeCardTC, setCardsPackIdAC, uptdateCardsGradeTC,
    updateNameCardTC, setAnswerAC, setQuestionAC, setCardIdAC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {SearchCards} from "../c6-SearchPacks/SearchCards";
import classes from './Cards.module.css'
import {CardsPaginator} from "./cardsPaginater";
import {Statrs} from "../c7-Stars/Stars";
import {Modal} from "../../../../Utils/Modal/Modal";
import BackArrow from './Images/BackArrow.svg'


export const Cards = () => {
    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const error = useSelector<RootReducerType, string | null>(state => state.cards.error)
    const {
        pageCount,
        page,
        cardsTotalCount,
        max,
        min,
        sortCards,
        currentAnswer,
        currentQuestion
    } = useSelector<RootReducerType, CardsReducerType>(state => state.cards)
    const dispatch = useDispatch()

    const params = useParams<'id'>()
    const cardsPack_id = params.id
    const navigate = useNavigate()

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);
    const [modalUpdateActive, setModalUpdateActive] = useState<boolean>(false);

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const [questionUpdate, setQuestionUpdate] = useState<string>('')
    const [answerUpdate, setAnswerUpdate] = useState<string>('')

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(getCardsTC())
        }
    }, [cardsPack_id, pageCount, page, max, min, sortCards, currentQuestion, currentAnswer])


    const addCard = useCallback((question: string, answer: string) => {
        if (cardsPack_id) {
            dispatch(setQuestionAC(question))
            dispatch(setAnswerAC(answer))
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(createCardTC())
        }
        setQuestion('')
        setAnswer('')
        setModalActive(false)
    }, [dispatch])
    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && question.trim() !== '' && answer.trim() !== '') {
            addCard(question, answer)
        }
    }
    const onCloseModalHandler = () => {
        setQuestion('')
        setAnswer('')
        setModalActive(false)
    }
    const onClickModalHandler = () => {
        if (question.trim() !== '' && answer.trim() !== '') {
            addCard(question, answer)
        }
    }


    const getCardsGrateHandler = (value: number, id:string, ) => {
        // dispatch(setSelectedAC(id, value))
        dispatch(uptdateCardsGradeTC( value, id))
    }



    return (
        <div className={classes.boxCard}>
            <div className={classes.backArrow} onClick={() => {navigate('/packs')}}>
                <img src={BackArrow} alt={'back'} />
            </div>
            <SearchCards cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            <div className={classes.blockCard}>
                <span>  Question</span>
                <span>Answer</span>
                <span>Grade</span>
                <span>Updated</span>
                <span>Url</span>
                <button onClick={() => setModalActive(true)} className={classes.buttonAddCard}>Add new card</button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={classes.modalTitle}>Card Info</div>
                <div className={classes.modalInputBox}>
                    <div>
                        <span className={classes.modalSpan}>Question</span>
                        <input
                            value={question}
                            onKeyPress={onKeyPressHandler}
                            onChange={onChangeQuestionHandler}
                            className={classes.modalInput}
                            placeholder={'Enter your question..'}
                            autoFocus
                        />
                    </div>
                    <div>
                        <span className={classes.modalSpan}>Answer</span>
                        <input
                            value={answer}
                            onKeyPress={onKeyPressHandler}
                            onChange={onChangeAnswerHandler}
                            className={classes.modalInput}
                            placeholder={'Enter your answer...'}
                            autoFocus
                        />
                    </div>
                </div>
                <div className={classes.btnModalWrap}>
                    <button className={classes.modalButtonSave} onClick={onClickModalHandler}>save</button>
                    <button className={classes.modalButtonCancel} onClick={onCloseModalHandler}>cancel</button>
                </div>
            </Modal>
            {
                cards.map(card => {
                    const removeCardHandler = () => {
                        dispatch(setCardsPackIdAC(card.cardsPack_id))
                        dispatch(removeCardTC(card._id))
                        setModalDeleteActive(false)
                    }
                    const updateCard = (question: string, answer: string) => {
                        dispatch(setCardsPackIdAC(card.cardsPack_id))
                        dispatch(setCardIdAC(card._id))
                        dispatch(setQuestionAC(question))
                        dispatch(setAnswerAC(answer))
                        dispatch(updateNameCardTC())
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


                    return (
                        <div key={card._id}>
                            <span>{card.question}</span>
                            <span>{card.answer}</span>
                            <Statrs  selected={card.grade > 0} callBack={getCardsGrateHandler} id={card._id} value={1}/>
                            <Statrs  selected={card.grade > 1.5} callBack={getCardsGrateHandler} id={card._id} value={2}/>
                            <Statrs  selected={card.grade > 2.5} callBack={getCardsGrateHandler} id={card._id} value={3}/>
                            <Statrs  selected={card.grade > 3.5} callBack={getCardsGrateHandler} id={card._id} value={4}/>
                            <Statrs  selected={card.grade > 4.5} callBack={getCardsGrateHandler} id={card._id} value={5}/>
                            <span>{card.grade.toFixed(2)}</span>
                            <span >{new Date(card.updated).toLocaleDateString()}</span>
                            <button onClick={() => setModalDeleteActive(true)}>del</button>
                            <button onClick={() => setModalUpdateActive(true)}>update</button>

                            <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
                                <div className={classes.modalTitle}>Delete Card</div>
                                <div className={classes.modalDelete}>Do you really want to remove
                                    <span className={classes.modalSpanPackName}>{`Card Question - ${card.question}?`}</span>
                                    <br/>
                                    All data will be excluded from this card.</div>
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
                        </div>
                    )
                })
            }
            <CardsPaginator cardsTotalCount={cardsTotalCount} page={page} pageCount={pageCount}/>
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )
}
