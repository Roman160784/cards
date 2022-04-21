import React from 'react';
import classes from "./RestorePassword.module.css";
import {NavLink, Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {getParamsForNewPasswordTC} from "../../../../n3-redux/a4-ForgotRasswordReducer/ForgotRasswordRducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {pathEnum} from "../../routes/a0-Main/Main";
import {toast} from "react-hot-toast";
import {setAppErrorAC} from "../../../../n3-redux/a7-AppReducer/AppReducer";

export type FormikErrorRestoreType = {
    email?: string
}

export const ForgotPassword = () => {

    const error = useSelector<RootReducerType, string | null>(state => state.app.authError)
    const notification = useSelector<RootReducerType, string | null>(state => state.forgotPassword.message)
    const dispatch = useDispatch()

    const message = `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                        link</a>
                    </div>`

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorRestoreType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(getParamsForNewPasswordTC({...values, from, message}))
        },
    });
    const notify = () => {
        if(error) {
            toast.error(error)
            dispatch(setAppErrorAC(null))
        }
    }
    const emailForSending = formik.values.email
    const from = `for person, f ${emailForSending}`
    // make the redirection to new page in order to confirm new password on your email(Max) "sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—"
    if (notification === "sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—") {
        return <Navigate to={pathEnum.checkEmail}/>
    }

    return (
        <div className={classes.blockForgotPassword}>
            <form onSubmit={formik.handleSubmit} className={classes.restoreForm}>
                <h1 className={classes.header}>Forgot your password?</h1>
                <div>
                    {formik.touched.email && formik.errors.email ?
                        <div className={classes.errors}>{formik.errors.email}</div> :
                        <div className={classes.errors}>{error}</div>}
                    <input className={classes.inputRestore} placeholder={'Email'}
                           {...formik.getFieldProps('email')}
                    />
                    <div className={classes.notification}>{notification}</div>
                </div>
                <button type="submit" className={classes.buttonSend}>Send Instructions</button>
                <div className={classes.linkRemember}>Did you remember yor password?</div>
                <NavLink to={'/login'} className={classes.loggingIn}>Try logging in</NavLink>
            </form>
            {notify()}
        </div>
    )
}