import React from 'react';
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import {InputField} from "./InputField";
import {Button} from "./Button";

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