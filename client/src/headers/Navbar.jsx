import React, { useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { MyContext } from '../context/Context';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate()
  const handleModal=()=>{
   
  }
  const logout=async()=>{
    const response = await axios.post("http://localhost:5000/auth/logout");
    console.log(response)
    navigate("/login")
    window.location.reload();  
  }
  const {user} = useContext(MyContext)
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="text-2xl font-extrabold text-white tracking-wider">
        MyApp
      </div>
      <div className="flex space-x-4">
       
        {user ? (
          <>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              onClick={()=>{ navigate("/modal")}}
            >
              Create Group
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
            <>
        <button
        onClick={()=>navigate("/register")}
          href="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Register
        </button>
        
        <button
                 onClick={()=>navigate("/login")}

          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
          Log In
        </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
