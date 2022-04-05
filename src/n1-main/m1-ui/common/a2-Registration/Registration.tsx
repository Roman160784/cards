
import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {addUserTC, registrationErrorAC} from '../../../../n3-redux/a3-RegistrationReducer/RegistrationReducer';
import { RootReducerType } from '../../../../n3-redux/a1-store/store';
import { Navigate } from 'react-router-dom';
import { pathEnum } from '../../routes/a0-Main/Main';
import {loginTC, setLoginErrorAC} from "../../../../n3-redux/a2-loginReducer/loginReducer";
import {FormikErrorType} from "../a1-Login/Login";

export const Registration = () => {

    const isRegistration = useSelector<RootReducerType, boolean>(state => state.registration.registration)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
           
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be 7 characters or more'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addUserTC(values))
            dispatch(registrationErrorAC(null))
            // alert(JSON.stringify(values, null, 2));
        },
    });

    if(isRegistration){
       return <Navigate to={pathEnum.login}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Sing Up</label>
            <div>
                <p style={{ opacity: '0.5' }}>Email</p>
                <input {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <p style={{ opacity: '0.5' }}>Password</p>
                <input {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <p style={{ opacity: '0.5' }}>Confirm password</p>
                <input {...formik.getFieldProps('confrimPassword')} />
            </div>

            <button type="submit">Register</button>
            <button >Cancel</button>
        </form>
    );

}