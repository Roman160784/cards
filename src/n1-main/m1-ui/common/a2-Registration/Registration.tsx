import * as Yup from 'yup';
import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {addUserTC} from '../../../../n3-redux/a3-RegistrationReducer/RegistrationReducer';
import {RootReducerType} from '../../../../n3-redux/a1-store/store';
import {Navigate} from 'react-router-dom';
import {pathEnum} from '../../routes/a0-Main/Main';
import classes from "./Registration.module.css";

export const Registration = () => {

    const isRegistration = useSelector<RootReducerType, boolean>(state => state.registration.registration)
    const error = useSelector<RootReducerType, string | null>(state => state.registration.registrationError)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
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
            dispatch(addUserTC(values))
            // alert(JSON.stringify(values, null, 2));
        },
    });

    if (isRegistration) return <Navigate to={pathEnum.login}/>

    return (
        <div className={classes.blockRegistration}>
            <form onSubmit={formik.handleSubmit} className={classes.registrationForm}>
                <h1>Sing Up</h1>
                <div>
                    <input {...formik.getFieldProps('email')} placeholder={'Email'}
                           className={classes.inputRegistration}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div className={classes.errors}>{formik.errors.email}</div> :
                        <div className={classes.errors}>{error}</div>}
                </div>
                <div>
                    <input {...formik.getFieldProps('password')} placeholder={'Password'}
                           className={classes.inputRegistration}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div className={classes.errors}>{formik.errors.password}</div> : null}
                </div>
                <div>
                    <input {...formik.getFieldProps('confirmPassword')} placeholder={'Confirm password'}
                           className={classes.inputRegistration}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div className={classes.errors}>{formik.errors.confirmPassword}</div> : null}
                </div>
                <div className={classes.boxButton}>
                    <button className={classes.buttonCancel}>Cancel</button>
                    <button type="submit" className={classes.buttonRegistration}>Register</button>
                </div>
            </form>
        </div>
    );

}