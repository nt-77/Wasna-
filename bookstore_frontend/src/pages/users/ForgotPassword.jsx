// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/user/forgotpassword', { email });
//             setMessage(response.data.message);
//         } catch (error) {
//             setMessage(error.response ? error.response.data.error : 'An error occurred');
//         }
//     };

//     return (
//         <div>
//             <h2>Forgot Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Send Reset Instructions</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import forgotPassword from "../../assets/forgot_password.svg";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../../components/Spinner";
// import { ReactComponent as ForgotPasswordIllustration } from './forgot-password-illustration.svg'; // Path to your illustration



const ForgotPassword = () => {
    const { enqueueSnackbar } = useSnackbar();
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
        setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/forgotpassword",
        { email }
      );     
       setLoading(false);
    //   setMessage(response.data.message);
      enqueueSnackbar(`${response.data.message}`, { variant: "success" });
    

    //   navigate("/resetpassword");
    } catch (error) {
        const err=error.response.data.error;
        enqueueSnackbar(`Error:  ${err}`, {
            variant: "error",
          });
    //   setError(
    //     error.response ? error.response.data.error : "An error occurred"
    //   );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 lg:m-14">

      <img
        src={forgotPassword}
        alt="Login Visual"
        className="w-2/5 lg:w-2/5 object-cover mb-4 ml-8 lg:mb-0 lg:mr-24 p-4 justify-center items-center"
      />
      <div className="lg:w-1/2 max-w-md w-full">
      {loading && (
        <Spinner/>
    )} 
    <div><h2 className="text-2xl font-semibold text-center lg:text-left">
    Forgot Password
  </h2>
  <form
    onSubmit={handleSubmit}
    className="bg-white  rounded pt-6 pb-8 mb-4"
  >
    <div className="mb-6">
      <label
        htmlFor="email"
        className="block text-blue-400 text-sm  mb-6"
      >
        Enter your email and we'll send you a link to reset your password.
      </label>
      <div className="relative flex items-center">
        <MdOutlineMail
          className="absolute left-0 pl-3 text-4xl text-gray-400"
          style={{ top: "40%", transform: "translateY(-50%)" }}
        />

        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 pr-3 py-2 w-full border rounded shadow appearance-none text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
    </div>
    <div className=" items-center ">
      <button
        type="submit"
        className="w-full p-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600 "

      >
        Submit
      </button>
      <div className="flex justify-center items-center mt-6">
      <IoIosArrowBack className="text-blue-400 "/>
      <a
        href="/login"
        className="inline-block align-baseline text-sm text-blue-400 hover:text-blue-600 center items-center"
      >
        Back to login
      </a>
      </div>
    </div>
  </form>
  {message && <p className="text-green-500 text-xs italic">{message}</p>}
  {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
       
      </div>
    </div>

  );
};

export default ForgotPassword;
