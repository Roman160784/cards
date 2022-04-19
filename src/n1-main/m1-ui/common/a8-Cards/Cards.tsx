import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {useNavigate, useParams} from "react-router-dom";
import {
    CardsReducerType,
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
import {Card} from "./Card";


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
        currentQuestion,
        _id,
        question,
        answer
    } = useSelector<RootReducerType, CardsReducerType>(state => state.cards)
    const dispatch = useDispatch()

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
    }, [cardsPack_id, pageCount, page, max, min, sortCards, currentQuestion, currentAnswer, _id, question, answer])


    const addCard = useCallback((question: string, answer: string) => {
        if (cardsPack_id) {
            dispatch(createCardTC({
                question,
                answer,
                cardsPack_id
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
            addCard(newQuestion, newAnswer)
        }
    }
    const onCloseModalHandler = () => {
        setQuestion('')
        setAnswer('')
        setModalActive(false)
    }
    const onClickModalHandler = () => {
        if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
            addCard(newQuestion, newAnswer)
        }
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
                    <div  className={classes.modalInputQuestion}>
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
                    <div  className={classes.modalInputAnswer}>
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
                        <div key={card._id}>
                            <Card
                                _id={card._id}
                                question={card.question}
                                answer={card.answer}
                                grade={card.grade}
                                updated={card.updated}
                            />
                        </div>
                    )
                })
            }
            <CardsPaginator cardsTotalCount={cardsTotalCount} page={page} pageCount={pageCount}/>
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )
}
