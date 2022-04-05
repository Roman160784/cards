import React from 'react';
import { Oval } from 'react-loader-spinner'

export const Preloader = () => {

    return (
        <div>
            <Oval height="50" 
            width="50" 
            color='grey' 
            ariaLabel='loading' />
        </div>
    )
}