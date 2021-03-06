import React from 'react';
import classes from './Preloader.module.css'
// import {ClipLoader, MoonLoader} from "react-spinners";
import { css } from "@emotion/react";

export const Preloader = () => {

    const override = css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
`;


    return (
        <div className={classes.wrapLoader}>
            <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg" className={classes.circleSVG}>
                <circle className={classes.circle1} cx="32" cy="32" r="25"/>
                <circle className={classes.circle2 } transform="rotate(-90 32 32)" cx="32" cy="32" r="25">
                    <animate attributeName="stroke-dashoffset"
                             values="0;143.92;130.84;117.76;104.68;91.6;78.52;65.44;52.36;39.28;26.22;13.14;0"
                             dur="3s" repeatCount="indefinite" calcMode="discrete"/>
                </circle>
            </svg>
            {/*<MoonLoader color={'#569384'} size={70} css={override}/>*/}
        </div>
    )
}