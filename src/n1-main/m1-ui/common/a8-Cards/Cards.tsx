import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {useNavigate, useParams} from "react-router-dom";
import {
    CardsReducerType,
    createCardTC, getCardsTC,
    setCardsPackIdAC, updateNameCardTC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {SearchCards} from "../c6-SearchPacks/SearchCards";
import classes from './Cards.module.css'
import {CardsPaginator} from "./cardsPaginater";
import {Modal} from "../../../../Utils/Modal/Modal";
import BackArrow from './Images/BackArrow.svg'
import {Card} from "./Card";
import {toast} from "react-hot-toast";
import {setAppErrorAC} from "../../../../n3-redux/a7-AppReducer/AppReducer";

export const Cards = () => {
    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const error = useSelector<RootReducerType, string | null>(state => state.app.authError)
    const {
        pageCount,
        page,
        cardsTotalCount,
        max,
        min,
        sortCards,
        currentAnswer,
        currentQuestion,
        _id,
        question,
        answer,
        questionImg,
        answerImg,
    } = useSelector<RootReducerType, CardsReducerType>(state => state.cards)
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null);

    const params = useParams<'id'>()
    const cardsPack_id = params.id
    const navigate = useNavigate()

    const [modalActive, setModalActive] = useState<boolean>(false);


    const [newQuestion, setQuestion] = useState<string>('')
    const [newAnswer, setAnswer] = useState<string>('')


    useEffect(() => {
        if (cardsPack_id) {
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(getCardsTC())
        }
    }, [cardsPack_id, pageCount, page, max, min, sortCards, currentQuestion, currentAnswer, _id, question, answer,
        questionImg, answerImg])


    const addCard = useCallback((question: string, answer: string, questionImg: string, answerImg: string) => {
        if (cardsPack_id) {
            dispatch(createCardTC({
                question,
                answer,
                cardsPack_id,
                questionImg,
                answerImg,
            }))
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
        if (e.key === 'Enter' && newQuestion.trim() !== '' && newAnswer.trim() !== '') {
            if (questionImg != null && answerImg != null) {
                addCard(newQuestion, newAnswer, questionImg, answerImg)
            }
        }
    }

    const onCloseModalHandler = () => {
        setQuestion('')
        setAnswer('')
        setModalActive(false)
    }

    const onClickModalHandler = () => {
        if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
            if (questionImg?.trim() != null && answerImg?.trim() != null) {
                addCard(newQuestion, newAnswer, questionImg, answerImg)
            }
        }
    }

    const notify = () => {
        if (error) {
            toast.error(error)
            dispatch(setAppErrorAC(null))
        }
    }

    return (
        <div className={classes.boxCard}>
            <div className={classes.backArrow} onClick={() => {
                navigate('/packs')
            }}>
                <img src={BackArrow} alt={'back'}/>
            </div>
            <SearchCards cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
            <div className={classes.boxCards}>
                <div className={classes.blockCard}>
                    <span className={classes.textHeader}>Question</span>
                    <span className={classes.textHeader}>Answer</span>
                    <span className={classes.textHeader}>Updated</span>
                    <span className={classes.textHeader}>Grade</span>
                    <span className={classes.textHeader}>Rating</span>
                    <button onClick={() => setModalActive(true)} className={classes.buttonAddCard}>Add new card
                    </button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <div className={classes.modalTitle}>Card Info</div>
                    <div className={classes.modalInputBox}>
                        <div className={classes.modalInputQuestion}>
                            <span className={classes.modalSpan}>Question</span>
                            <input
                                value={newQuestion}
                                onKeyPress={onKeyPressHandler}
                                onChange={onChangeQuestionHandler}
                                className={classes.modalInput}
                                placeholder={'Enter your question..'}
                                autoFocus
                            />
                        </div>
                        <div className={classes.modalInputAnswer}>
                            <span className={classes.modalSpan}>Answer</span>
                            <input
                                value={newAnswer}
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

                        return (
                            <div className={classes.contentCards} key={card._id}>
                                <Card
                                    _id={card._id}
                                    question={card.question}
                                    answer={card.answer}
                                    grade={card.grade}
                                    updated={card.updated}
                                    questionImg={card.questionImg}
                                    answerImg={card.answerImg}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <CardsPaginator cardsTotalCount={cardsTotalCount} page={page} pageCount={pageCount}/>
            {notify()}
        </div>
    )
}
