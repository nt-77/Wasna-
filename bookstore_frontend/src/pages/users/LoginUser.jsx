import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../../components/Spinner";
import { useNavigate,Navigate } from "react-router-dom";
import loginImage from "../../assets/loginImage.svg";
import {useAuth} from '../../auth/AuthContext'
import Navbar from "../../nav/Navbar";
import Footer from '../../footer/Footer'
import axios from "axios";

const LoginUser = () => {
  const { isManager ,setCurrentUser,setIsManager} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/user/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        // console.log(res);
        enqueueSnackbar("user login successful", { variant: "success" });
        if (res.data._id === '660be24a40c10013b3f044b2') { // Assume this ID means the user is a manager
          localStorage.setItem('currentUser', 'true');
          localStorage.setItem('isManager', 'true');
          setCurrentUser(true);
          setIsManager(true);
          navigate('/dashboard');
        } else {
          console.log("Setting user in local storage");
          localStorage.setItem('currentUser', 'true');
          localStorage.setItem('isManager', 'false');
          setCurrentUser(true);
          setIsManager(false);
          navigate('/userdashboard');
        }
        // setCurrentUser(true)
        // if(res.data._id === '660be24a40c10013b3f044b2'){
        //   setIsManager(true)
        // }
        // console.log("isManager",isManager);
        // if (isManager){
        //   // navigate("/");
        //   <Navigate to='/dashboard'/>
        // }else{
        //   // navigate("/bookingPortal");

        //   <Navigate to='/userdashboard'/>

        // }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`Error:  ${error.response.data.message}`, {
          variant: "error",
        });
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar/>
    <div>
    <div className="flex h-screen flex-col lg:flex-row ">
      {/* <div className="lg:w-4/5 flex justify-center items-center bg-white"> */}
      {/* <img src={loginImage} className="w-1/2  block object-cover"></img> */}
      {/* <div className="lg:w-4/5 bg-white flex flex-col justify-center items-center p-4">
        <img src={loginImage} alt="Login Visual" className="w-2/5 block object-cover mb-4 p-4" />  */}
      <div className="flex flex-col lg:flex-row lg:w-4/5 bg-white justify-center items-center p-4">
        <img
          src={loginImage}
          alt="Login Visual"
          className="w-3/5 lg:w-2/5 object-cover mb-4 lg:mb-0 lg:mr-4 p-4"
        />

        <div className="w-full max-w-md p-4">
        {loading && (
        <Spinner/>
    )}
          <h1 className="text-4xl font-bold pb-3">Login</h1>{" "}
          {/* Increased font size and centered text */}
          <p className="mb-4 text-lg text-gray-700 pb-3">Welcome back!</p>
          <form onSubmit={handleLogin} className="mb-4 ">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-5 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-5 leading-tight focus:outline-none focus:shadow-outline "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <div className="text-sm pb-3">
              <a
                href="/forgotPassword"
                className="text-blue-500 hover:text-blue-700 "
              >
                Did you forget your password?
              </a>
            </div>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <div className=" lg:w-1/5 bg-blue-400 flex justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="font-bold text-2xl pb-5 text-white ">New Here?</h2>
          <p className="text-sm mb-8 text-white ">
            Sign up and make your event booking seamless!
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-blue-600 font-bold py-2 px-4 rounded-xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>

    )
  // );
};

export default LoginUser;
