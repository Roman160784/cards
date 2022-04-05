
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
            dispatch(registrationErrorAC(null))
            // alert(JSON.stringify(values, null, 2));
        },
    });

    if (isRegistration) return <Navigate to={pathEnum.login} />



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
                <p style={{opacity: '0.5'}}>Password</p>
                <input {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <p style={{opacity: '0.5'}}>Confirm password</p>
                <input {...formik.getFieldProps('confirmPassword')} />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
            </div>

            <button type="submit">Register</button>
            <button> Cancel </button>
        </form>
    );

}