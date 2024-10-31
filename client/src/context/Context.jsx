import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const MyContext = createContext();

const Context = ({ children }) => {
    const [user, setUser] = useState(null);
    const decodeToken = (token) => {
        try {
          const base64Url = token.split('.')[1]; // Get the payload part of the token
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace base64 URL encoding
          const decodedData = JSON.parse(atob(base64)); // Decode and parse the payload
          return decodedData;
        } catch (error) {
          console.error('Invalid token:', error);
          return null;
        }
      };
      
      useEffect(() => {
          const fetchCookie = async () => {
              const cookieValue = Cookies.get('token');
              if (cookieValue) {
                  const decodedToken = decodeToken(cookieValue); // Manually decode the token
                  setUser(decodedToken); // Set the decoded value in the state
                  console.log(decodedToken); // Logs the decoded token object
              } else {
                  console.log("No token found");
              }
          };
          fetchCookie(); // Call the async function
      }, []);
    return (
        <MyContext.Provider value={{user, setUser }}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
