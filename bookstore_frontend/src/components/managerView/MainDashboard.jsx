import {Link} from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import ShowAllDecor from '../../pages/decor/ShowAllDecor';
import ShowUserEventsManager from '../../pages/events/ShowUserEventsManager'
import Dashboard from './Dashboard';
import GetAllUser from '../../pages/users/GetAllUsers'
import React, { useState } from 'react';
import Navbar from '../../nav/Navbar';
import Footer from '../../footer/Footer'
const MainDashboard = () => {
    
    const navigate = useNavigate(); 
    const [showDecor, setShowDecor] = useState(false); 
    const [showEvent, setShowEvent] = useState(false); 
    const [showUser, setShowUser] = useState(false); 
  return (
    <div>
<Navbar/>
      {showDecor ? (
        <ShowAllDecor />  // Show decor component if showDecor is true
      ) : showUser ? (
        <GetAllUser />  // Show user component if showUser is true and showDecor is false
      ) : showEvent ?(
        <ShowUserEventsManager/>
      ) :(
        <Dashboard  setShowEvent={setShowEvent} setShowDecor={setShowDecor} setShowUser={setShowUser} />  // Default to showing Dashboard if neither is true
      )}
      <Footer/>
    </div>
      );
    };

export default MainDashboard