import React from 'react';
import {Navigate, NavLink, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import classes from './NewPassword.module.css'
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import * as Yup from "yup";
import {addUserTC} from "../../../../n3-redux/a3-RegistrationReducer/RegistrationReducer";
import {pathEnum} from "../../routes/a0-Main/Main";

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
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Password must be 7 characters or more')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required '),
        }),
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
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div className={classes.errors}>{formik.errors.confirmPassword}</div> : null}
                    <input {...formik.getFieldProps('confirmPassword')} placeholder={'Confirm password'}
                           className={classes.inputPassword}
                    />
                    {/*{errorServerMessage ? <div> {errorServerMessage} </div> : null}*/}
                </div>
               <div><p className={classes.textPassword}>Create new password and we will send you further instructions to email</p></div>
                <button type="submit" className={classes.buttonPassword}>Create new password</button>
            </form>
        </div>
    )
}

