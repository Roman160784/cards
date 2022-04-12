import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import classes from './NewPassword.module.css'

import * as Yup from "yup";
import {setNewPasswordTC} from "../../../../n3-redux/a5-NewRasswordReducer/NewRasswordRducer";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {pathEnum} from "../../routes/a0-Main/Main";
import {logoutTC} from "../../../../n3-redux/a2-loginReducer/loginReducer";



export const NewPassword = () => {
    const dispatch = useDispatch()
    const params = useParams<'token'>()
    const resetPasswordToken = params.token

    const successInfo = useSelector<RootReducerType, string | null>(state => state.newPassword.info)


    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Password must be 7 characters or more')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required '),
        }),
        onSubmit: values => {
            dispatch(setNewPasswordTC({...values, password, resetPasswordToken}))
        },
    });
    const password = formik.values.password

    if(successInfo === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
        dispatch(logoutTC())
       return <Navigate to={pathEnum.login}/>
    }

    return (
        <div className={classes.blockNewPassword}>
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

