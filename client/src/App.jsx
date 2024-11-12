import React, { useContext } from 'react';
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import Login from './auth/Login';
import Register from './auth/Register';
import HomePage from './components/HomePage';
import GoogleAuth from './auth/GoogleAuth';
import Navbar from './headers/Navbar';
import axios from "axios"
import { MyContext } from './context/Context';
import Modal from './pages/modal';
axios.defaults.withCredentials = true;
function App() {
const {user} = useContext(MyContext)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {
          user ? (
            <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/modal" element={<Modal />} />
            </>
          ):(
            <>
            <Route path="/" element={<FirstPage />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />

            </>
          ) 
        }
      
  
      </Routes>

    </BrowserRouter>
  )
}
export default App;
