
import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addUserTC } from '../../../../n3-redux/a3-RegistrationReducer/RegistrationReducer';
import { RootReducerType } from '../../../../n3-redux/a1-store/store';
import { Navigate } from 'react-router-dom';
import { pathEnum } from '../../routes/a0-Main/Main';

export const Registration = () => {

    const isRegistration = useSelector<RootReducerType, boolean>(state => state.registration.registration)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
           
        },
        onSubmit: values => {
            dispatch(addUserTC(values))
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
            </div>
            <div>
                <p style={{ opacity: '0.5' }}>Password</p>
                <input {...formik.getFieldProps('password')} />
            </div>
            <div>
                <p style={{ opacity: '0.5' }}>Confrim password</p>
                <input {...formik.getFieldProps('confrimPassword')} />
            </div>

            <button type="submit">Register</button>
            <button >Cancel</button>
        </form>
    );

}