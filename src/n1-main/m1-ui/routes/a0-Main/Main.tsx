import {Navigate, Route, Routes} from "react-router-dom"
import {Login} from "../../common/a1-Login/Login"
import {Registration} from "../../common/a2-Registration/Registration"
import {ForgotPassword} from "../../common/a3-ForgotPasword/ForgotPassword"
import {NewPassword} from "../../common/a4-NewPassword/NewRassword"
import {Profile} from "../../common/a5-Profile/Profile"
import {TestComponent} from "../../common/a6-test/test"
import {Nav} from "../a1-Navlink/Navlink"
import classes from "./Main.module.css"
import React from "react";
import {CheckEmail} from "../../common/a4-NewPassword/CheckEmail";
import {CardsPacks} from "../../common/a7-CardPacks/CardsPacks";
import {Cards} from "../../common/a8-Cards/Cards";


export enum pathEnum {
    main = '/',
    checkEmail = '/checkEmail',
    login = '/login',
    registration = '/registration',
    forgotPassword = '/forgotPassword',
    newPassword = '/set-new-password/:token',
    profile = '/profile',
    test = '/test',
    error404 = '/404',
    empty = '/*',
    packs = '/packs',
    pack = '/pack',
    cards = '/cards/:id',
}

// http://localhost:3000/#/set-new-password/5a75e040-b656-11ec-a69a-65588f1fc455


export const Main = () => {
    return (
        <div className={classes.blockMain}>
            <Nav/>
            <div className={classes.blockComponents}>
                <div>
                    <Routes>
                        <Route path={pathEnum.login} element={<Login/>}/>
                        <Route path={pathEnum.checkEmail} element={<CheckEmail/>}/>
                        <Route path={pathEnum.registration} element={<Registration/>}/>
                        <Route path={pathEnum.forgotPassword} element={<ForgotPassword/>}/>
                        <Route path={pathEnum.newPassword} element={<NewPassword/>}/>
                        <Route path={pathEnum.profile} element={<Profile/>}/>
                        <Route path={pathEnum.test} element={<TestComponent/>}/>
                        <Route path={pathEnum.packs} element={<CardsPacks/>}/>
                        <Route path={pathEnum.cards} element={<Cards/>}/>
                        <Route path={pathEnum.error404} element=
                            {<h1 style={{textAlign: 'center', fontSize: '50px'}}>404: OOPS.. PAGE NOT FOUND</h1>}/>
                        <Route path={pathEnum.empty} element={<Navigate to={pathEnum.error404}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}