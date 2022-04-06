import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../../common/a1-Login/Login"
import { Registration } from "../../common/a2-Registration/Registration"
import { ForgotPassword } from "../../common/a3-ForgotPasword/ForgotPassword"
import { NewPassword } from "../../common/a4-NewPassword/NewRassword"
import { Profile } from "../../common/a5-Profile/Profile"
import { TestComponent } from "../../common/a6-test/test"
import { Nav } from "../a1-Navlink/Navlink"
import classes from "./Main.module.css"
import React from "react";



export enum pathEnum {
    main = '/',
    login = '/login',
    registration = '/registration',
    restorePassword = '/restorePasword',
    newPassword = '/newPasword',
    profile = '/profile',
    test = '/test',
    error404 = '/404',
    empty = '/*',
}


export const Main = () => {

    return (
            <div>
                <Nav />
                <div className={classes.blockComponents}>
                    <div className={classes.content}>
                    <Routes>
                        <Route path={pathEnum.login} element={<Login />} />
                        <Route path={pathEnum.registration} element={<Registration />} />
                        <Route path={pathEnum.restorePassword} element={<ForgotPassword />} />
                        <Route path={pathEnum.newPassword} element={<NewPassword />} />
                        <Route path={pathEnum.profile} element={<Profile />} />
                        <Route path={pathEnum.main} element={<Profile />} />
                        <Route path={pathEnum.test} element={<TestComponent />} />
                        <Route path={pathEnum.error404} element={<h1 style={{ textAlign: 'center', color: 'red' }}>404: PAGE NOT FOUND</h1>} />
                        <Route path={pathEnum.empty} element={<Navigate to={pathEnum.error404} />} />
                    </Routes>
                    </div>
                </div>
            </div>
      
    )
}