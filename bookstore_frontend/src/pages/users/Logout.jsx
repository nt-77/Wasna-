import React from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {useAuth} from '../../auth/AuthContext'

const Logout = () => {
  const { setCurrentUser} = useAuth();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    // try {
    //   // Adjust the URL to where your backend server is hosted
    //   await axios.get('/logout', { withCredentials: true });
    //   // Optionally clear any client-side stored user information here
    //   // For example, if you're using context or Redux for state management
    //   alert('User successfully logged out.');
    //   history.push('/login'); // Redirect to login page or homepage as preferred
    // } catch (error) {
    //   console.error('Logout failed:', error.response?.data?.message || 'Server error');
    // }
    axios
    .get("http://localhost:5000/api/user/logout",{withCredentials:true})
    .then(() => {
      enqueueSnackbar('user logout successfully',{variant:'success'})
      navigate("/login");
      setCurrentUser(false)
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar('Could not logout user',{variant:'error'})
    //   setLoading(false);
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
