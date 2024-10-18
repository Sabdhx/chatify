import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
  // Add this here

function Login() {
  const [count, setCount] = useState(0)
  const { loginWithRedirect, user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("Access Token:", token); // Check if the token is retrieved 
      const response = await axios.get(
        "http://localhost:5000/auth/users",
        {
          email: user.email,
          username: user.name,
          profilePicture: user.picture,  
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
       
          withCredentials: true
        }
      );
      console.log("Response:", response.data); // Check the response
    } catch (error) {
      console.error("Error fetching token:", error); // Log any errors
    }
  };
  return (<div className="App">
    {!isAuthenticated ? (
      <button onClick={() => loginWithRedirect()}>Log In</button>
    ) : (
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out
        </button>
        <button onClick={getToken} className='bg-gray-400 px-3 rounded py-1'>get token</button>
        <button onClick={() => navigate("/home")}>navigate</button>
      </div>
    )}
  </div>
  );
}
export default Login