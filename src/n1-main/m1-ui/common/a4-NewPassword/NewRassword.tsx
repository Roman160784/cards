import React from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import classes from './NewPassword.module.css'

export type FormikErrorPasswordType = {
    errors?: string
    password?: string
}

export const NewPassword = () => {
    const dispatch = useDispatch()
    const params = useParams<'token'>()
    const token = params.token
    console.log(token)

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorPasswordType = {}
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Password must be 7 characters or more'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={classes.newPasswordForm}>
                <h1 className={classes.header}>Create new password</h1>
                <div>
                    {formik.touched.password && formik.errors.password ?
                        <div className={classes.errors}>{formik.errors.password}</div> : null}
                    <input className={classes.inputPassword} placeholder={'Password'}
                           {...formik.getFieldProps('password')}
                    />
                    {/*{errorServerMessage ? <div> {errorServerMessage} </div> : null}*/}
                </div>
               <div><p className={classes.textPassword}>Create new password and we will send you further instructions to email</p></div>
                <button type="submit" className={classes.buttonPassword}>Create new password</button>
            </form>
        </div>
    )
}