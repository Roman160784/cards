import React from 'react';
import {useParams} from "react-router-dom";

export const NewPassword = () => {

    const params = useParams<'token'>()
    const token = params.token
    console.log(token)

    return(
        <div>New Password</div>
    )
}