// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// Assuming you have a function to check authentication status
// This could be a request to a backend endpoint like '/getuser'
// that uses the `protect` middleware to verify the user's token

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // This should be your endpoint that requires the protect middleware, acting as authentication verification
        const response = await axios.get('http://localhost:5000/api/user/getuser', { withCredentials: true });
        setCurrentUser(response.data); // Assuming successful response contains user data
      } catch (error) {
        console.log(error);
        setCurrentUser(null); // Authentication failed or not logged in
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};