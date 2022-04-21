import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import { useParams} from "react-router-dom";

import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {
    getCardsTC,
    setCardsPackIdAC,
    uptdateCardsGradeTC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";


const grades = ["I don't know", "forgot", "long thought", "confused", "I know it"];

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {

    const params = useParams<'*'>();
    let id = params['*']
    const dispatch = useDispatch();
    console.log(id)

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useSelector((store: RootReducerType) => store.cards);
    // const loading = useSelector<RootReducerType, boolean>(state => state.app.loading)
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
        console.log('LearnContainer useEffect');
        if (first) {
            dispatch(getCardsTC(id));
            setFirst(false);
        }
        console.log(cards)
        //if (cards.length > 0) {
        console.log(getCard(cards));
        setCard(getCard(cards));
        //}


        return () => {
            dispatch(setCardsPackIdAC(id = ''))
            console.log('LearnContainer useEffect off');
        }
    }, [cards]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }
    const gradeClickHandler = (g: string) => {
        if (g === "I don't know") {
            dispatch(uptdateCardsGradeTC(1, card._id))
        } else if (g === "forgot") {
            dispatch(uptdateCardsGradeTC(2, card._id))
        } else if (g === "long thought") {
            dispatch(uptdateCardsGradeTC(3, card._id))
        } else if (g === "confused") {
            dispatch(uptdateCardsGradeTC(4, card._id))
        } else if (g === "I know it") {
            dispatch(uptdateCardsGradeTC(5, card._id))
        }
    }

    return (
        <div>
            LearnPage

            <div>{card?.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>

            {isChecked && (
                <>
                    <div>{card?.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} onClick={() => {gradeClickHandler(g)}}>{g}</button>

                    ))}

                    <div>
                        <button onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LearnPage;