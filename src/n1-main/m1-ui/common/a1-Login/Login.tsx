import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../../../n3-redux/a2-loginReducer/loginReducer";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {pathEnum} from "../../routes/a0-Main/Main";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector<RootReducerType, boolean>(state => state.login.isLogin)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
            } else if (values.password.length < 4) {
                errors.password = 'Password must be 4 characters or more'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            // alert(JSON.stringify(values, null, 2));
        },
    });

    if (isLogin) {
        return <Navigate to={pathEnum.profile}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <div>
                <input
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ?
                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            </div>

            <div>
                <input
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ?
                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <input type={"checkbox"}
                       {...formik.getFieldProps('rememberMe')}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}