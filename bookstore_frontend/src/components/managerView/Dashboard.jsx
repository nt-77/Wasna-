import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ShowAllDecor from "../../pages/decor/ShowAllDecor";
import React, { useState } from "react";
import Navbar from "../../nav/Navbar";
const Dashboard = ({setShowDecor,setShowUser, setShowEvent}) => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate("/bookingPortal"); // Navigate to the booking portal route
  };

  return (
    <> 
    {/* <Navbar/>   */}
     <div className="p-10 bg-gray-100 min-h-screen">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Large Booking Event Card */}
        <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
          <h2 className="font-bold text-2xl mb-4">Book an Event</h2>
          <p>
            Start planning your dream event today by booking a venue, choosing
            decor, and customizing the menu.
          </p>
          <button
            className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
        </div>

        {/* Small Card for Events */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h3 className="font-semibold text-xl">Manage Events</h3>
          <p className="text-sm">View and manage all scheduled events.</p>
          <button className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setShowEvent(true)}>
            View Events
          </button>
        </div>

        {/* Small Card for Decor */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h3 className="font-semibold text-xl">Manage Decor</h3>
          <p className="text-sm">
            Explore and manage available decor styles and themes.
          </p>
          <button
            className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowDecor(true)}
          >
            Manage Decor
          </button>
        </div>

        {/* Small Card for Users */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h3 className="font-semibold text-xl">Manage Users</h3>
          <p className="text-sm">
            Manage user accounts, roles, and permissions.
          </p>
          <button className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setShowUser(true)}
            >
            User Settings
          </button>
        </div>

        {/* Small Card for Menu */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h3 className="font-semibold text-xl">Menu Menu</h3>
          <p className="text-sm">Customize the menu for different events.</p>
          <button className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600">
            Edit Menu
          </button>
        </div>
      </div>
    </div>
    </>

  );
};

export default Dashboard;
