// import React, { useState } from 'react';
// import axios from 'axios';
// import Spinner from '../../components/Spinner';
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";

// const RegisterUser = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const data = {
//         email,
//         password,
//         name
//       };
//       setLoading(true);
//       axios
//         .post("http://localhost:5000/api/user/register", data,{withCredentials:true})
//         .then(() => {
//           setLoading(false);
//           enqueueSnackbar('user registered successfully',{variant:'success'})
//           navigate("/bookingPortal");
//         })
//         .catch((error) => {
//           console.log(error);
//           enqueueSnackbar(`Error:  ${error.response.data.message}`,{variant:'error'})
//           setLoading(false);
//         });
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterUser;

// try {
//   const { data } = await axios.post('/register', { name, email, password });
//   console.log(data);
//   // Redirect or handle the response upon successful registration
// } catch (error) {
//   console.error(error.response.data.message);
// }

import React, { useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import registerImage from "../../assets/registerImage.svg";
import { MdOutlineMail } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {useAuth} from '../../auth/AuthContext'

const RegisterUser = () => {
  const { isManager ,setCurrentUser,setIsManager} = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      name,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/user/register", data,{withCredentials:true})
      .then(() => {
        setLoading(false);
        enqueueSnackbar("user registered successfully", { variant: "success" });
        setCurrentUser(true)
        // navigate("/bookingPortal");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`Error:  ${error.response.data.message}`, {
          variant: "error",
        });
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    // <div className="flex h-screen flex-col lg:flex-row ">
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Image container */}
      {/* <div className="lg:w-2/5 w-full flex justify-center  items-center bg-cover"> */}
      <div className="flex flex-col w-full items-center bg-cover p-3 items-center justify-center">
        <img
          src={registerImage}
          alt="Login Visual"
          className="w-2/5 lg:w-3/5 object-cover mb-4 lg:mb-0 lg:mr-4  lg:ml-24 p-3  "
        />
        <p className="text-center text-blue-600 lg:text-left w-full lg:w-auto px-3 lg:px-0">
          Congrats! You are one step closer to your dream event!
        </p>
      </div>
      {/* <div className="min-h-screen  justify-center">
      <div className="max-w-md w-full mx-auto"> */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center lg:pr-28 ">
        <div className="max-w-md w-full mx-auto  ">
          <div className="text-3xl font-bold text-blue-900 mt-2 text-center p-3">
            Welcome to our Family
          </div>
          <div className="text-center text-sm  text-blue-500">
            Streamlining your event planning journey – a simple, efficient way
            to book and organize the perfect event.
          </div>
        </div>

        <div className="max-w-md w-full mx-auto mt-2  p-8 ">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative flex items-center">
              <MdDriveFileRenameOutline
                className="absolute left-0 pl-3 text-4xl text-gray-400"
                style={{ top: "40%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 pr-3  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="relative flex items-center">
              <MdOutlineMail
                className="absolute left-0 pl-3 text-4xl text-gray-400"
                style={{ top: "40%", transform: "translateY(-50%)" }}
              />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded shadow appearance-none text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="relative flex items-center">
              <RiLockPasswordLine
                className="absolute left-0 pl-3 text-4xl text-gray-400"
                style={{ top: "40%", transform: "translateY(-50%)" }}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600 "
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-md w-full mx-auto mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
