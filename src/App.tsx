import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import TodoList from './components/Home/ToDo/pages/todoList';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" index element={<Home />}  />
          <Route path="/todoList" element={<TodoList />}  />
      </Routes>
    </>
  );
}

export default App;
