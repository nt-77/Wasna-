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
import {jwtDecode} from 'jwt-decode';


const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
const { enqueueSnackbar } = useSnackbar();

  const [currentUser, setCurrentUser] = useState(false);
  const [isManager, setIsManager] = useState(null);

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
          console.log("done");
          setCurrentUser(true); // Assuming the user is authenticated successfully
          console.log("response decoded",response.data.id);
          if(response.data.id === '660be24a40c10013b3f044b2'){   //check if user 23 has the same id as entered to check if it is a manager
            setIsManager(true); 
          } else {
            setIsManager(false);
          }
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
    const user = localStorage.getItem('currentUser');
    const manager = localStorage.getItem('isManager') === 'true'; // LocalStorage stores everything as string
    setCurrentUser(user);
    setIsManager(manager);
    // verifyUser(); 
    verifyUser();
  }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log("token",token);
//     // setCurrentUser(!!token);
//     if (token){
//       const decoded = jwtDecode(token);
//       console.log("decoded",decoded);
//  // Assuming the token includes userId and role
//       if(decoded.id === '660be24a40c10013b3f044b2'){ 
//         setIsManager(true)
//       }else{
//         setIsManager(false)

//       }
//     }
//     // setCurrentUser(!!token);
//   }, []);

  // useEffect(() => {
  //   console.log('currentUser',currentUser); // This will log the current state whenever it changes
  //   console.log('isManager',isManager); // This will log the current state whenever it changes
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,isManager ,setCurrentUser,setIsManager}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);