import React from 'react';
import {InputField} from "./InputField";
import {Button} from "./Button";
import {useDispatch} from "react-redux";
import {loginTC} from "../../../../n3-redux/a2-loginReducer/loginReducer";

export const Login = () => {
    return (
        <div>
            <form style={{width: "200px"}}>
                <h1>LOGIN</h1>
                <InputField/>
                <Button/>
            </form>
        </div>
    )
}