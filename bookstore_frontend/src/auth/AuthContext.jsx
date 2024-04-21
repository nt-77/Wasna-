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

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
const { enqueueSnackbar } = useSnackbar();

  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       // This should be your endpoint that requires the protect middleware, acting as authentication verification
  //       const response = await axios.get('http://localhost:5000/api/user/', { withCredentials: true });
  //       setCurrentUser(response.data); // Assuming successful response contains user data
  //       console.log(currentUser);
  //     } catch (error) {
  //       console.log(error);
  //       setCurrentUser(null); // Authentication failed or not logged in
  //     }
  //   };

  //   verifyUser();
  // }, []);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/autheriseUSer",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setCurrentUser(true); // Assuming the user is authenticated successfully
          console.log("User is authenticated");
        } else {
          setCurrentUser(false); // No valid user session found
          console.log("No valid session");
          enqueueSnackbar(
            "User nor autherized, please login",
            { variant: "error" }
          );
        }
      } catch (error) {
        // console.error("Authentication check failed:", error);
        setCurrentUser(false); // Handle error case by assuming no valid user
        enqueueSnackbar(
          "User nor autherized, please login",
          { variant: "error" }
        );
      }
    };

    verifyUser();
  }, []);

  // useEffect(() => {
  //   console.log(currentUser); // This will log the current state whenever it changes
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};