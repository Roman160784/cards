import React from 'react';
import classes from "./RestorePassword.module.css";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {getParamsForNewPasswordTC} from "../../../../n3-redux/a4-ForgotRasswordReducer/ForgotRasswordRducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";

export type FormikErrorRestoreType = {
    email?: string
}

export const ForgotPassword = () => {

    const errorServerMessage = useSelector<RootReducerType, string | null>(state => state.forgotPassword.error)
    const dispatch = useDispatch()

    const from = "for person, f <matveyenkaraman@gmail.com>"
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
            // alert(JSON.stringify(values, null, 2));
        },
    });


    return (
        <form onSubmit={formik.handleSubmit} className={classes.restoreForm}>
            <h1 className={classes.header}>Forgot your password?</h1>
            <div>
                {formik.touched.email && formik.errors.email ?
                    <div className={classes.errors}>{formik.errors.email}</div> : null}
                <input className={classes.inputRestore} placeholder={'Email'}
                       {...formik.getFieldProps('email')}
                />
                {errorServerMessage ? <div> {errorServerMessage} </div> : null}
            </div>
            <button type="submit" className={classes.buttonSend}>Send Instructions</button>
            <NavLink to={'/'} className={classes.linkRemember}>Did you remember yor password?</NavLink>
            <NavLink to={'/'} className={classes.loggingIn}>Try logging in</NavLink>
        </form>
    )
}