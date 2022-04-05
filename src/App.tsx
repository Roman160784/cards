import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './n1-main/m1-ui/routes/a0-Main/Main';
import { Preloader } from './n1-main/m1-ui/common/c5-Preloader/Preloader';


function App() {
  return (
    <div className="App">
      <Preloader/>
      <Main/>
    </div>
  );
}

export default App;
