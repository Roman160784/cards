import React, {useState} from 'react';
import classes from './Paginator.module.css';
import {useDispatch} from "react-redux";
import {setCurrentPageCardsAC} from "../../../../n3-redux/a9-CardsReducer/CardsReducer";


export type PaginatorPropsType = {
    cardsTotalCount: number
    pageCount: number
    page: number
    portionSize?: number
}

export const CardsPaginator: React.FC<PaginatorPropsType> = ({
                                                                 cardsTotalCount = 0,
                                                                 pageCount,
                                                                 page,
                                                                 portionSize = 10
                                                             }) => {

    const dispatch = useDispatch()

    let pagesCount = Math.ceil(cardsTotalCount / pageCount);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageCardsAC(pageNumber))
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