import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC, setLoginErrorAC} from "../../../../n3-redux/a2-loginReducer/loginReducer";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {pathEnum} from "../../routes/a0-Main/Main";
import {Navigate, NavLink} from "react-router-dom";
import classes from './Login.module.css'

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector<RootReducerType, boolean>(state => state.login.isLogin)
    const error = useSelector<RootReducerType, string | null>(state => state.login.error)


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
            } else if (values.password.length < 6) {
                errors.password = 'Password must be 7 characters or more'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            dispatch(setLoginErrorAC(null))
            // alert(JSON.stringify(values, null, 2));
        },
    });

    if (isLogin) return <Navigate to={pathEnum.profile}/>
        
    return (
        <form onSubmit={formik.handleSubmit} className={classes.loginForm}>
            <h1 className={classes.headerLogin}>Login</h1>
            <div>
                <input className={classes.inputLogin} placeholder={'Email'}
                       {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ?
                    <div className={classes.errorsLogin}>{formik.errors.email}</div> : null}
            </div>

            <div>
                <input className={classes.inputLogin} placeholder={'Password'}
                       {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ?
                    <div className={classes.errorsLogin}>{formik.errors.password}</div> : null}
                <div className={classes.errorsLogin}>{error}</div>
            </div>
            <div>
                <label>
                    <input type={"checkbox"}
                           {...formik.getFieldProps('rememberMe')}
                    />
                    Remember me
                </label>
            </div>
            <NavLink to={pathEnum.restorePassword} className={classes.forgot}>Forgot Password</NavLink>
            <button type="submit" className={classes.buttonLogin}>Login</button>
            <NavLink to={pathEnum.registration} className={classes.signUp}>Sign Up</NavLink>
        </form>
    );
}