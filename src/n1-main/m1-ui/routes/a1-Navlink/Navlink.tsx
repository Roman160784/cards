import {NavLink} from "react-router-dom"
import {pathEnum} from "../a0-Main/Main"
import classes from './NavLink.module.css'


export const Nav = () => {
    return (
        <nav className={classes.navLinks}>
            <div>
                <NavLink to={pathEnum.login}
                         className={({isActive}) => `${isActive ? classes.active : classes.link}`}>
                    Login
                </NavLink>
            </div>
            <div>
                <NavLink to={pathEnum.registration}
                         className={({isActive}) => `${isActive ? classes.active : classes.link}`}>
                    Registration
                </NavLink>
            </div>
            <div>
                <NavLink to={pathEnum.restorePassword}
                         className={({isActive}) => `${isActive ? classes.active : classes.link}`}>
                    Forgot Password
                </NavLink>
            </div>
            <div>
                <NavLink to={pathEnum.newPassword}
                         className={({isActive}) => `${isActive ? classes.active : classes.link}`}>
                    New Password
                </NavLink>
            </div>
            <div>
                <NavLink to={pathEnum.profile}
                         className={({isActive}) => `${isActive ? classes.active : classes.link}`}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to={pathEnum.test}
                         className={({isActive}) => `${isActive ? classes.active : classes.link}`}>
                    Test
                </NavLink>
            </div>
        </nav>
    )
}