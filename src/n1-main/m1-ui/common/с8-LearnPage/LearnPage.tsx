import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useParams} from "react-router-dom";

import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {
    getCardsTC,
    setCardsPackIdAC,
    uptdateCardsGradeTC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import classes from './LearnPage.module.css'
import {buttonBaseClasses} from "@mui/material";

type LearnPagePropsType = {
    packName: string
}

const grades = ["I don't know", "forgot", "long thought", "confused", "I know it"];

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return {sum: newSum, id: newSum < rand ? i : acc.id}
    }, {sum: 0, id: -1});


    return cards[res.id + 1];
}

export const LearnPage = ({packName}: LearnPagePropsType) => {

    const params = useParams<'*'>();
    let id = params['*']
    const dispatch = useDispatch();

    const [grade, setGrade] = useState<number>(0)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isShowAnswer, setIsShowAnswer] = useState<boolean>(true);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useSelector((store: RootReducerType) => store.cards);
    // const id = useSelector<RootReducerType, string>(state => state.cards.cardsPack_id)


    const [card, setCard] = useState<CardsType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,


        created: '',
        updated: '',
    });

    // useEffect(() => {
    //     if (!cards) {
    //         setLoadingAC(true)
    //         setCard(getCard(cards))
    //     } else {
    //         if(loading)
    //         setLoadingAC(false)
    //     }
    //
    // },[cards])

    useEffect(() => {

        if (first) {
            dispatch(getCardsTC(id));
            setFirst(false);
        }

        //if (cards.length > 0) {
        setCard(getCard(cards));
        //}

        return () => {
            dispatch(setCardsPackIdAC(id = ''))

        }
    }, [cards]);

    const onNext = () => {
        if (grade === 0) {
            dispatch(uptdateCardsGradeTC(1, card._id))
        } else if (grade === 1) {
            dispatch(uptdateCardsGradeTC(2, card._id))
        } else if (grade === 2) {
            dispatch(uptdateCardsGradeTC(3, card._id))
        } else if (grade === 3) {
            dispatch(uptdateCardsGradeTC(4, card._id))
        } else if (grade === 4) {
            dispatch(uptdateCardsGradeTC(5, card._id))
        }
        setGrade(0)
        setIsChecked(false);
        setIsShowAnswer(true)
        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }


    const onClickShowAnswerHandler = () => {
        setIsChecked(true)
        setIsShowAnswer(false)
    }

    const clickGradeHandler = (i: number) => {
        setGrade(i)
    }


    return (
        <div className={classes.wrapContainer}>
            <span className={classes.title}>Pack: {packName}</span>

            <div className={classes.question}><span style={{fontWeight: 'bold'}}>Question:</span> {card?.question}</div>
            {isShowAnswer && <div className={classes.btnCheckWrap}>
                <button onClick={onClickShowAnswerHandler} className={classes.btnCheck}>Show answer</button>
            </div>}

            {isChecked && (
                <>
                    <div className={classes.answer}><span style={{fontWeight: 'bold'}}>Answer:</span> {card?.answer}
                    </div>
                    <div className={classes.checkYourSelf}>Check yourself:</div>

                    {grades.map((g, i) => (

                        <div key={'grade-' + i}>
                            <button className={grade === i ? classes.resultButtonActives : classes.resultButton}
                                    onClick={()=>{clickGradeHandler(i)}}></button> <span>{g}</span></div>
                    ))}
                    <div className={classes.btnNextWrap}>
                        <button className={classes.btnNext} onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};