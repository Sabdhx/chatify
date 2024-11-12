import React from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from '../components/0auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GoogleAuth() {
    const navigate = useNavigate();
    const googleAuth=async()=>{
        try {
             const Provider =new GoogleAuthProvider();
             const auth = getAuth(app);
             const result= await signInWithPopup(auth , Provider);
             const token = await result.user.getIdToken();

             const response = await axios.post("http://localhost:5000/auth/google", {
                name:result.user.displayName,
                email:result.user.email,      
                profilePicture:result.user.photoURL
              }, {
  withCredentials: true
});
             console.log(response.data);

             navigate("/home")
             window.location.reload()

        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center">
    <button className="bg-blue-500 text-white py-1 px-[33%] rounded-lg hover:bg-blue-600" 
    onClick={googleAuth}
    >
      login with google
    </button>
  </div>
  )
}

export default GoogleAuth