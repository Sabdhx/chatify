import React from 'react'
import { useNavigate } from 'react-router-dom';

function FirstPage() {
    const navigate = useNavigate();

    return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-6">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 className="text-4xl font-bold text-center mb-4 text-black">Welcome to Our Chat Website!</h1>
      <p className="text-gray-700 text-center mb-6 ">
        Join our vibrant community and connect with people around the world.
        Sign up today to start chatting!
      </p>
      <div className="flex justify-center space-x-4">
       
       
      </div>
    </div>
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-200">
        &copy; 2024 Chat Website. All rights reserved.
      </p>
    </div>
  </div>
);
}

export default FirstPage