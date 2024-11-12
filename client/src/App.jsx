import React from 'react';
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import Login from './auth/Login';
import Register from './auth/Register';
import HomePage from './components/HomePage';
import GoogleAuth from './auth/GoogleAuth';
import Navbar from './headers/Navbar';
import axios from "axios"
axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
  
      </Routes>

    </BrowserRouter>
  )
}
export default App;
