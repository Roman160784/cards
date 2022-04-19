import c from "./Stars.module.css";
import React from "react";
import {bool} from "yup";

export type StatrsPropsType = {
    id: string
    selected:boolean
    value: 1 | 2 | 3 | 4 | 5
    callBack: (id: string, value:number) => void
}

export const Statrs = ({id, selected, value, callBack}:StatrsPropsType ) => {

    const handlerStar = ()=>{
        callBack(id, value)
    }
    return  (
        <div className={c.stars}>
            <span  id={id} onClick={handlerStar} className={c.star}>
                {selected ? <span id={id} className={c.starSelect}>★</span> : <span id={id}>★</span>} </span>
        </div>
    )
}

// <div className={c.simpleRating}>
//     <div className={c.simpleRatingItems}>
//         <input type="radio" checked={true}  onClick={onClickHandler}  id={card._id} className={c.ratingItem} name={'ratting'} value={'5'}/>
//         <label htmlFor={card._id}  className={c.ratingLabel}></label>
//         <input type="radio" checked={true} onClick={onClickHandler}  id={card._id} className={c.ratingItem} name={'ratting'} value={'4'}/>
//         <label htmlFor={card._id} className={c.ratingLabel}></label>
//         <input type="radio" checked={true} onClick={onClickHandler} id={card._id} className={c.ratingItem} name={'ratting'} value={'3'}/>
//         <label htmlFor={card._id} className={c.ratingLabel}></label>
//         <input type="radio" checked={true} onClick={onClickHandler} id={card._id} className={c.ratingItem} name={'ratting'} value={'2'}/>
//         <label htmlFor={card._id} className={c.ratingLabel}></label>
//         <input type="radio" checked={true} onClick={onClickHandler} id={card._id} className={c.ratingItem} name={'ratting'} value={'1'}/>
//         <label htmlFor={card._id} className={c.ratingLabel}></label>
//     </div>
// </div>