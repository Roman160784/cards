import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {useParams} from "react-router-dom";
import {
    CardsReducerType,
    setSelectedAC,
    createCardTC, getCardsTC,
    removeCardTC, setCardsPackIdAC,
    updateNameCardTC
} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";
import {CardsType} from "../../../../n4-dal/API/CardsAPI";
import {SearchCards} from "../c6-SearchPacks/SearchCards";
import classes from './Cards.module.css'
import {CardsPaginator} from "./cardsPaginater";
import {Statrs} from "../c7-Stars/Stars";
import {addPackofCardsTC} from "../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";


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

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(getCardsTC())
        }
    }, [cardsPack_id, pageCount, page, max, min, sortCards, currentQuestion, currentAnswer])

    const createCardHandler = () => {
        if (cardsPack_id) {
            dispatch(setCardsPackIdAC(cardsPack_id))
            dispatch(createCardTC(cardsPack_id))
        }
    }


    const getCardsGrateHandler = (id: string, value: number) => {
        dispatch(setSelectedAC(id, value))
    }


    return (
        <div className={classes.boxCards}>
            <div className={classes.boxCard}>
                <SearchCards cardsPack_id={cardsPack_id ? cardsPack_id : ''}/>
                <div className={classes.boxCards}>
                    <div className={classes.blockCard}>
                        <span className={classes.textHeader}>Question</span>
                        <span className={classes.textHeader}>Answer</span>
                        <span className={classes.textHeader}>Updated</span>
                        <span className={classes.textHeader}>Grade</span>
                        <button onClick={createCardHandler} className={classes.buttonAddCard}>Add new card</button>
                    </div>

                    {
                        cards.map(card => {
                            const removeCardHandler = () => {
                                dispatch(setCardsPackIdAC(card.cardsPack_id))
                                dispatch(removeCardTC(card._id))
                            }
                            const updateNameCardHandler = () => {
                                dispatch(setCardsPackIdAC(card.cardsPack_id))
                                dispatch(updateNameCardTC(card._id))
                            }
                            return (

                                <div key={card._id} className={classes.contentCards}>
                                    <span className={classes.textCard}>{card.question}</span>
                                    <span className={classes.textCard}>{card.answer}</span>
                                    <span className={classes.textCard}>{card.updated}</span>
                                    <div className={classes.textCard}>
                                        <Statrs selected={card.grade > 0} callBack={getCardsGrateHandler} id={card._id}
                                                value={1}/>
                                        <Statrs selected={card.grade > 1} callBack={getCardsGrateHandler} id={card._id}
                                                value={2}/>
                                        <Statrs selected={card.grade > 2} callBack={getCardsGrateHandler} id={card._id}
                                                value={3}/>
                                        <Statrs selected={card.grade > 3} callBack={getCardsGrateHandler} id={card._id}
                                                value={4}/>
                                        <Statrs selected={card.grade > 4} callBack={getCardsGrateHandler} id={card._id}
                                                value={5}/>
                                    </div>
                                    <div className={classes.buttonCard}>
                                        <button onClick={removeCardHandler} className={classes.btnDel}>del</button>
                                        <button onClick={updateNameCardHandler} className={classes.btnUpdate}>update
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <CardsPaginator cardsTotalCount={cardsTotalCount} page={page} pageCount={pageCount}/>
                    {error && <div className={classes.errors}>{error}</div>}
                </div>
            </div>
        </div>
    )
}
