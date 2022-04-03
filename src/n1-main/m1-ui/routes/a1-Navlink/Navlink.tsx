import { NavLink } from "react-router-dom"
import { pathEnum } from "../a0-Main/Main"


export const Nav = () => {
    return (
        <nav>
            <div >
                <NavLink to={pathEnum.login}>Login</NavLink>
            </div>
            <div >
                <NavLink to={pathEnum.registration}>Registration</NavLink>
            </div>
            <div >
                <NavLink to={pathEnum.restorePassword}>Forgot Password</NavLink>
            </div>
            <div >
                <NavLink to={pathEnum.newPassword}>New Password</NavLink>
            </div>
            <div >
                <NavLink to={pathEnum.profile}>Profile</NavLink>
            </div>
            <div >
                <NavLink to={pathEnum.test}>Test</NavLink>
            </div>
        </nav>
    )
}