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

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "../src/auth/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginUser from "./pages/users/LoginUser";
import GetUser from "./pages/users/GetUser";
import { useNavigate } from "react-router-dom";
import BookingForm from "./components/home/bookingPortal/BookingForm";
import UpdateUserProfile from "./pages/users/UpdateUserProfile";
import ChangePassword from "./pages/users/ChangePassword";
import RegisterUser from "./pages/users/RegisterUser";
import ForgotPassword from "./pages/users/ForgotPassword";
import ResetPassword from "./pages/users/ResetPassword";
import Step3 from "./components/home/bookingPortal/Step3";
import Home from "./pages/Home";
import Dashboard from "./components/managerView/Dashboard";
import MainDashboard from "./components/managerView/MainDashboard";
import DeleteDecor from "./pages/decor/DeleteDecor";
import ShowDecor from "./pages/decor/ShowDecor";
import CreateDecorItem from "./pages/decor/CreateDecorItem";
import UserHome from "./pages/userHome";
import EditDecor from "./pages/decor/EditDecor";
import { Navigate } from "react-router-dom";
import ShowUserEvents from "./pages/events/ShowUserEvents";
import DeleteEvent from "./pages/events/DeleteEvent";
import ShowEvent from "./pages/events/ShowEvent";
import UpdateEvent from "./pages/events/UpdateEvent";
import UserDelete from "./pages/users/UserDelete";
import ShowUser from "./pages/users/ShowUser";
import Main from "./components/viewDecor/Main.jsx";
import MainMenu from "./components/viewMenu/MainMenu.jsx";
import UpdateUserEvent from './pages/events/UpdateUserEvent.jsx'

// Import other components

// Define a component for handling protected routes
// const ProtectedRoutes = () => {
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
  const { currentUser, isManager } = useAuth();
  //   const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') === 'true');
  //   const [isManager, setIsManager] = useState(localStorage.getItem('isManager')=== 'true');
  // useEffect(() =>{
  // console.log("currentUser",currentUser);
  // console.log("isManager",isManager);
  // }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decorOptions" element={<Main />} />
      <Route path="/menuOptions" element={<MainMenu />} />
      <Route
        path="/login"
        element={
          !currentUser ? (
            <LoginUser />
          ) : isManager ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/userdashboard" />
          )
        }
      />
      <Route
        path="/bookingPortal"
        element={currentUser ? <BookingForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={
          currentUser && isManager ? (
            <MainDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !currentUser ? (
            <RegisterUser />
          ) : isManager ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/bookingPortal" />
          )
        }
      />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/resetpassword"
        element={
          !currentUser ? (
            <ResetPassword />
          ) : isManager ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/bookingPortal" />
          )
        }
      />
      <Route path="/changeUserPassword" element={<ChangePassword />} />
      <Route
        path="/decor/details/:id"
        element={
          currentUser && isManager ? <ShowDecor /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/event/details/:id"
        element={
          currentUser ? <ShowEvent /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/user/details/:id"
        element={
          currentUser && isManager ? <ShowUser /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/event/delete/:id"
        element={
          currentUser && isManager ? <DeleteEvent /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/decor/delete/:id"
        element={
          currentUser && isManager ? <DeleteDecor /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/user/delete/:id"
        element={
          currentUser && isManager ? <UserDelete /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/decor/create"
        element={
          currentUser && isManager ? (
            <CreateDecorItem />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/decor/edit/:id"
        element={
          currentUser && isManager ? <EditDecor /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/event/edit/:id"
        element={
          currentUser && isManager ? <UpdateEvent /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/event/user/edit/:id"
        element={
          currentUser ? <UpdateUserEvent /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/event"
        element={
          currentUser && !isManager ? (
            <ShowUserEvents />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/userdashboard"
        element={
          currentUser && !isManager ? <UserHome /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}
export default App;

// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/login" element={!(localStorage.getItem('currentUser') === 'true')  ? <LoginUser /> : ((localStorage.getItem('isManager')=== 'true')  ? <Navigate to="/dashboard" /> : <Navigate to="/userdashboard" />)} />
// <Route path="/bookingPortal" element={(localStorage.getItem('currentUser') === 'true')  ? <BookingForm /> : <Navigate to="/login" />} />
// <Route path="/dashboard" element={(localStorage.getItem('currentUser') === 'true') && (localStorage.getItem('isManager')=== 'true')? <MainDashboard /> : <Navigate to="/login" />}/>
// <Route path="/register" element={!(localStorage.getItem('currentUser') === 'true')  ? <RegisterUser /> : ((localStorage.getItem('isManager')=== 'true')  ? <Navigate to="/dashboard" /> : <Navigate to="/bookingPortal" />)} />
// <Route path="/forgotpassword" element={<ForgotPassword />} />
// <Route path="/resetpassword" element={!(localStorage.getItem('currentUser') === 'true')  ? <ResetPassword /> : ((localStorage.getItem('isManager')=== 'true')  ? <Navigate to="/dashboard" /> : <Navigate to="/bookingPortal" />)} />
// <Route path="/changeUserPassword" element={<ChangePassword />} />
// <Route path="/decor/details/:id" element={(localStorage.getItem('currentUser') === 'true')  && (localStorage.getItem('isManager')=== 'true')? <ShowDecor />: <Navigate to="/login" />} />
// <Route path="/decor/delete/:id" element={(localStorage.getItem('currentUser') === 'true')  && (localStorage.getItem('isManager')=== 'true')? <DeleteDecor /> : <Navigate to="/login" />} />
// <Route path="/decor/create" element={(localStorage.getItem('currentUser') === 'true')  && (localStorage.getItem('isManager')=== 'true')? <CreateDecorItem />: <Navigate to="/login" />} />
// <Route path="/decor/edit/:id" element={(localStorage.getItem('currentUser') === 'true')  && (localStorage.getItem('isManager')=== 'true')? <EditDecor />: <Navigate to="/login" />}/>
// <Route path="/event" element={(localStorage.getItem('currentUser') === 'true')  && !(localStorage.getItem('isManager')=== 'true')? <ShowUserEvents />: <Navigate to="/login" />} />
// <Route path="/userdashboard" element={(localStorage.getItem('currentUser') === 'true')  && !(localStorage.getItem('isManager')=== 'true')? <UserHome />: <Navigate to="/login" />} />
// </Routes>

{
  /* <Routes>
<Route path="/" element={currentUser ? <Navigate to="/bookingPortal" /> : <Navigate to="/login" />} />
<Route path="/login" element={!currentUser ? <LoginUser /> : <Navigate to="/bookingPortal" />} />
<Route path="/bookingPortal" element={currentUser ? <BookingForm /> : <Navigate to="/login" />} />
</Routes> */
}

{
  /* </AuthProvider> */
}

//     <AuthProvider>
//   {/* <Router> */}
//     <Routes>
//     <Route path="/" element={currentUser ? <Navigate to="/bookingPortal" /> : <Navigate to="/login" />} />
//     <Route path="/login" element={!currentUser ? <LoginUser /> : <Navigate to="/bookingPortal" />} />
//     <Route path="/bookingPortal" element={currentUser ? <BookingForm /> : <Navigate to="/login" />} />
//     </Routes>
//   {/* </Router> */}
// </AuthProvider>

// <Routes>
// <Route path="/" element={currentUser ? <Navigate to="/bookingPortal" /> : <Navigate to="/login" />} />
// <Route path="/login" element={!currentUser  ? <LoginUser /> : (isManager === 'true' ? <Navigate to="/dashboard" /> : <Navigate to="/bookingPortal" />)} />
// <Route path="/bookingPortal" element={currentUser && isManager === 'false' ? <BookingForm /> : <Navigate to="/login" />} />
// <Route path="/dashboard" element={currentUser && isManager === 'true'? <MainDashboard /> : <Navigate to="/login" />}/>
// </Routes>

// <AuthProvider>

// <Routes>
//   <Route path="/login" element={<LoginUser />} />
//   <Route path="/register" element={<RegisterUser />} />
//   <Route path="/forgotpassword" element={<ForgotPassword />} />
//   <Route path="/resetpassword" element={<ResetPassword />} />
//   <Route path="/fetchuser" element={<PrivateRoute><GetUser /></PrivateRoute>} />
//   <Route path="/bookingPortal" element={<PrivateRoute><BookingForm /></PrivateRoute>} />
//   <Route path="/UpdateUserProfile" element={<PrivateRoute><UpdateUserProfile /></PrivateRoute>} />
//   <Route path='/bookingPortal/decor' element={<PrivateRoute><Step3/></PrivateRoute>}/>
//   <Route path="/changeUserPassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
//   <Route path="/decor/details/:id" element={<PrivateRoute><ShowDecor /></PrivateRoute>} />
//   <Route path="/decor/delete/:id" element={<PrivateRoute><DeleteDecor /></PrivateRoute>} />
//   <Route path="/decor/create" element={<PrivateRoute><CreateDecorItem /></PrivateRoute>} />
//   <Route path="/decor/edit/:id" element={<PrivateRoute><EditDecor /></PrivateRoute>} />
//   {/* Add more routes as needed */}
//   <Route path="/" element={<Home />} />
//   <Route path="/dashboard" element={<MainDashboard/>}/>
// </Routes>
