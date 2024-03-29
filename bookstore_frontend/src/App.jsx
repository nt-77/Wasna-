// import React from 'react'
// import {Routes, Route} from 'react-router-dom'
// import Home from './pages/Home'
// import CreateBook from './pages/Createbook'
// import DeleteBook from './pages/DeleteBook'
// import EditBook from './pages/EditBook'
// import ShowBook from './pages/ShowBook'
// import ShowAllDecor from './pages/decor/ShowAllDecor'
// import CreateDecorItem from './pages/decor/CreateDecorItem'
// import DeleteDecor from './pages/decor/DeleteDecor'
// import EditDecor from './pages/decor/EditDecor'
// import ShowDecor from './pages/decor/ShowDecor'
// import BookingForm from './components/home/bookingPortal/BookingForm'
// import Step3 from './components/home/bookingPortal/Step3'
// import LoginUser from './pages/users/LoginUser'
// import RegisterUser from './pages/users/RegisterUser'
// import GetUser from './pages/users/GetUser'


// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/decor' element={<ShowAllDecor/>}/>
//       <Route path='/books/create' element={<CreateBook/>}/>
//       <Route path='/books/details/:id' element={<ShowBook/>}/>
//       <Route path='/books/edit/:id' element={<EditBook/>}/>
//       <Route path='/books/delete/:id' element={<DeleteBook/>}/>
//       <Route path='/decor/create' element={<CreateDecorItem/>}/>
//       <Route path='/decor/delete/:id' element={<DeleteDecor/>}/>
//       <Route path='/decor/details/:id' element={<ShowDecor/>}/>
//       <Route path='/decor/edit/:id' element={<EditDecor/>}/>
//       <Route path='/bookingPortal' element={<BookingForm/>}/>
//       <Route path='/login' element={<LoginUser/>}/>
//       <Route path='/register' element={<RegisterUser/>}/>
//       <Route path='/fetchUser' element={<GetUser/>}/>
//       <Route path='/bookingPortal/decor' element={<Step3/>}/>
//     </Routes>

//   )
// }

// export default App;

import React from 'react';
import {Routes, Route} from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider, useAuth} from '../src/auth/AuthContext'
import PrivateRoute from './components/PrivateRoute';
import LoginUser from './pages/users/LoginUser'
import GetUser from './pages/users/GetUser';
import { useNavigate } from 'react-router-dom';
import BookingForm from './components/home/bookingPortal/BookingForm'
import UpdateUserProfile from './pages/users/UpdateUserProfile';
import ChangePassword from './pages/users/ChangePassword';
import RegisterUser from './pages/users/RegisterUser'
import ForgotPassword from './pages/users/ForgotPassword';
import ResetPassword from './pages/users/ResetPassword';
import Home from './pages/Home'


// Import other components

// Define a component for handling protected routes
// const ProtectedRoutes = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <Switch>
//       {/* Define all routes that require authentication here */}
//       <PrivateRoute path="/fetchuser" component={GetUser} />
//       {/* Add more protected routes as needed */}
//       {/* Redirect to login page if no other route is matched and user is not authenticated */}
//       <Route render={() => (!user ?       navigate('/login') :       navigate('/fetchuser'))} />
//     </Switch>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Switch>
//           <Route path="/login" component={LoginUser} />
//           <Route path="/" component={ProtectedRoutes} />
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// }
function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
        <Routes>
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/fetchuser" element={<PrivateRoute><GetUser /></PrivateRoute>} />
          <Route path="/bookingPortal" element={<PrivateRoute><BookingForm /></PrivateRoute>} />
          <Route path="/UpdateUserProfile" element={<PrivateRoute><UpdateUserProfile /></PrivateRoute>} />
          <Route path="/changeUserPassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          {/* Add more routes as needed */}
          <Route path="/" element={<Home />} />
        </Routes>
      {/* </Router> */}
    </AuthProvider>
  );
}
export default App;

