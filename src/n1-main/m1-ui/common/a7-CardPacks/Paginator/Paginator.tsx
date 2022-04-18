import React, {useState} from 'react';
import classes from './Paginator.module.css';
import {useDispatch} from "react-redux";
import {setCurrentPageAC} from "../../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer";

export type PaginatorPropsType = {
    cardPacksTotalCount: number
    pageCount: number
    page: number
    portionSize?: number
    value: number[]
    userId: string
    cardsView: 'my' | 'all'
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            cardPacksTotalCount = 0,
                                                            pageCount,
                                                            page,
                                                            portionSize = 10,
                                                            value,
                                                            userId,
                                                            cardsView
                                                        }) => {

    const dispatch = useDispatch()

    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

     let onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }

    return (
        <div className={classes.paginatorCards}>
            {
                portionNumber > 1 &&
                <button className={classes.btn} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>prev</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={page === p ? classes.selectedPage : classes.select}
                                 onClick={() => {onPageChanged(p)}}>{p}</span> })}
            {
                portionCount > portionNumber &&
                <button className={classes.btn} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>next</button>
            }
        </div>
    )
}
