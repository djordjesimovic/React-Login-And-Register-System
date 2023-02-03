import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"

import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard';
import SuccesLogin from './components/SuccesLogin';
import SuccesRegister from './components/SuccesRegister';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={ <LoginCard />} />
        <Route path='register' element={ <RegisterCard />} />
        <Route path='succesLogin' element={ <SuccesLogin />} />
        <Route path='succesRegister' element={ <SuccesRegister />} />
      </Routes>
    </div>
  );
}

export default App;
