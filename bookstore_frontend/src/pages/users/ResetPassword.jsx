// import React, { useState } from 'react';
// import axios from 'axios';
// // import { useLocation } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

// const ResetPassword = () => {
//     const [newPassword, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     // const location = useLocation();

//     // Function to extract token from URL
//     const getTokenFromUrl = () => {
//         return new URLSearchParams(location.search).get('token');
//     };
// console.log("working");
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (newPassword !== confirmPassword) {
//             setMessage('Passwords do not match.');
//             return;
//         }

//         try {
//             const token = getTokenFromUrl();
//             await axios.post('http://localhost:5000/api/user/resetpassword', { token, newPassword },{withCredentials: true});
//             setMessage('Your newPassword has been successfully reset.');
//         } catch (error) {
//             setMessage('Failed to reset newPassword. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Reset Your newPassword</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>New newPassword:</label>
//                     <input
//                         type="newPassword"
//                         value={newPassword}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Confirm New newPassword:</label>
//                     <input
//                         type="newPassword"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Reset newPassword</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ResetPassword;
import React, { useState } from 'react';
import axios from 'axios';
import forgotPassword from "../../assets/forgot_password.svg";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../auth/AuthContext'
import { useSnackbar } from "notistack";
import Spinner from '../../components/Spinner'

const ResetPassword = () => {
  const { isManager ,setCurrentUser,setIsManager} = useAuth();
    
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

        const getTokenFromUrl = () => {
        return new URLSearchParams(location.search).get('token');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            // setMessage('Passwords do not match.');
            enqueueSnackbar("Passwords do not match", { variant: "warning" });
            return;
        }
        if (newPassword.length < 6 || confirmPassword.length< 6) {
            // setMessage('Passwords do not match.');
            enqueueSnackbar("password must be atleast 6 characters", { variant: "warning" });
            return;
        }

        try {
            setLoading(true);
            const token = getTokenFromUrl();
            await axios.post('http://localhost:5000/api/user/resetpassword', { token, newPassword }, { withCredentials: true })
            // if (newPassword < 6 || confirmPassword < 6) {
            //     // setMessage('Passwords do no<6t match.');
            //     return;
            // }
            .then((res) => {
                setLoading(false);
                console.log(res);
                enqueueSnackbar("user login successful", { variant: "success" });
                setCurrentUser(true)
                if(res.data.user._id === '660be24a40c10013b3f044b2'){
                  setIsManager(true)
                }
    
        enqueueSnackbar("Your password has been successfully reset", { variant: "success" });
        // navigate("/bookingPortal");

            // setMessage('Your password has been successfully reset.');
        })
        } catch (error) {
            enqueueSnackbar(`Error:  ${error.response.data.message}`, {
                variant: "error",
              });
            // setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 lg:m-14">
       {loading && (
        <Spinner/>
    )}
      <img
        src={forgotPassword}
        alt="Login Visual"
        className="w-2/5 lg:w-2/5 object-cover mb-4 ml-8 lg:mb-0 lg:mr-24 p-4 justify-center items-center"
      />
        <div className=" flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 ">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Reset Your Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="new-password" className="sr-only">New Password</label>
                            <div className="relative flex items-center">
                            <RiLockPasswordLine
                className="absolute left-0 pl-3 text-4xl text-gray-400"
                style={{ top: "40%", transform: "translateY(-50%)" }}
              />
                            <input
                                id="new-password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="pl-10 pr-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <div className="relative flex items-center">
                            <RiLockPasswordLine
                className="absolute left-0 pl-3 text-4xl text-gray-400"
                style={{ top: "40%", transform: "translateY(-50%)" }}
              />
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="pl-10 pr-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-400 text-white rounded-xl hover:bg-blue-600 "
                            >
                            Reset Password
                        </button>
                    </div>
                </form>
                {message && (
                    <div className="text-center mt-4">
                        <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </p>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;
