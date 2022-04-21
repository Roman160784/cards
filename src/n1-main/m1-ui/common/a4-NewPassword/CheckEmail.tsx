import React from 'react';
import classes from './CheckEmail.module.css'
import email from './images/Email.svg'

export const CheckEmail = () => {
    return (
        <div className={classes.wrapper}>
            <img className={classes.img} src={email} alt={'email'}/>
            <h2 className={classes.title}>Check Email</h2>
            <span className={classes.span}>We’ve sent an Email with instructions to your email</span>
            <span className={classes.span}>You can close this page</span>
        </div>
    )
}

