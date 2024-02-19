import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" index element={<Home />}  />
      </Routes>
    </>
  );
}

export default App;
