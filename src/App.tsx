import React, { useEffect } from 'react';
import './App.css';
import { Main, pathEnum } from './n1-main/m1-ui/routes/a0-Main/Main';
import { Preloader } from './n1-main/m1-ui/common/c5-Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from './n3-redux/a1-store/store';
import { isAuthTC } from './n3-redux/a7-AppReducer/AppReducer';
import { Navigate } from 'react-router-dom';


function App() {

  const dispatch = useDispatch()
  const loading = useSelector<RootReducerType, boolean>(state => state.app.loading)
  const isLogin = useSelector<RootReducerType, boolean>(state => state.login.isLogin)
  const initialised = useSelector<RootReducerType, boolean>(state => state.app.initialised)

  useEffect(() => {
    dispatch(isAuthTC())

  }, [])



  if (!initialised) return <Preloader />

  // if (!isLogin) return <Navigate to={pathEnum.login}/>


  return (
    <div className="App">
      {loading && <Preloader />}
      <Main />
    </div>
  );
}

export default App;
