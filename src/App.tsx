import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Main, pathEnum} from './n1-main/m1-ui/routes/a0-Main/Main';
import {Preloader} from './n1-main/m1-ui/common/c5-Preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerType} from './n3-redux/a1-store/store';
import {isAuthTC} from './n3-redux/a7-AppReducer/AppReducer';
import {Navigate} from 'react-router-dom';
import {logoutTC} from "./n3-redux/a2-loginReducer/loginReducer";


function App() {
    const dispatch = useDispatch()
    const loading = useSelector<RootReducerType, boolean>(state => state.app.loading)
    const isInitialized = useSelector<RootReducerType, boolean>(state => state.app.initialized)


    useEffect(() => {
        dispatch(isAuthTC())
    }, [])




    if (!isInitialized) return <Preloader />

    // if (!isLogin) return <Navigate to={pathEnum.login}/>


    return (
        <div className="App">
            {loading && <Preloader/>}
            <Main/>

        </div>
    );
}

export default App;
