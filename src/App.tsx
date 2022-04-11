import React, {useEffect} from 'react';
import './App.css';
import {Main} from './n1-main/m1-ui/routes/a0-Main/Main';
import {Preloader} from './n1-main/m1-ui/common/c5-Preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerType} from './n3-redux/a1-store/store';
import {isAuthTC} from './n3-redux/a7-AppReducer/AppReducer';
import {fetchPackCardsTC} from "./n3-redux/a8-CardsPacksReducer/CardsPacksReducer";




function App() {
    const dispatch = useDispatch()
    const loading = useSelector<RootReducerType, boolean>(state => state.app.loading)
    const isInitialized = useSelector<RootReducerType, boolean>(state => state.app.initialized)


    useEffect(() => {
        dispatch(isAuthTC())
    }, [])


    if (!isInitialized) return <Preloader/>

    // if (!isLogin) return <Navigate to={pathEnum.login}/>


    return (
        <div className="App">
            {loading && <Preloader/>}
            <Main/>
        </div>
    );
}

export default App;
