// import Spinner from "../components/Spinner";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { MdOutlineAddBox } from "react-icons/md";
// import TableDisplay from "../components/home/TableDisplay";
// import CardDisplay from "../components/home/CardDisplay";

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:5000/books")
//       .then((response) => {
//         setBooks(response.data.data);
//         // console.log(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);
//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl my-8">Books List</h1>
//         <Link to="books/create">
//           <MdOutlineAddBox className="text-sky-800 text-4xl" />
//         </Link>
//       </div>
//       {loading ? (
//         <Spinner />
//       ) : showCard ? (
//         <CardDisplay books={books}  />
//       ) : (
//         <TableDisplay books={books} />
//       )}
//       <div className=" flex items-center gap-x-4 justify-left pl-2">
//         <button
//           onClick={() => setShowCard(true)}
//           className="bg-sky-300 rounded-lg py-1 px-4 hover:bg-sky-500"
//         >
//           Card View
//         </button>
//         <button
//           onClick={() => setShowCard(false)}
//           className="bg-sky-300 rounded-lg py-1 px-4 hover:bg-sky-500"
//         >
//           Table View
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userDashboard from "../assets/userDashboard.svg";
import ShowUserEvents from "../pages/events/ShowUserEvents";
import axios from "axios";
import Navbar from "../nav/Navbar";
import Footer from '../footer/Footer';

const UserHome = () => {
  const [showEvents, setShowEvents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/event/myevents", { withCredentials: true })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/bookingPortal"); // Navigate to the booking portal route
  };
  return (
    <>
    <Navbar />
    <div className="bg-white p-6 ">
      <div className="flex pb-8 justify-center items-center ml-20 mt-10 ">
        <img src={userDashboard} alt="Bride" className="w-[45rem] h-auto" />
        <div className="ml-10 p-5 rounded bg-white bg-opacity-75 text-gray-700">
          <h1 className="text-5xl font-bold font-roboto pb-4">Plan And Book</h1>
          <div className="flex">
            <div className="title-underline bg-blue-500 w-20 h-1 mx-auto mt-4 mr-3"></div>
            <h1 className="text-5xl font-bold font-roboto">Your Wedding</h1>
          </div>
          <div className="flex mt-4 justify-center">
            <button
              onClick={navigateToLogin}
              className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg shadow animated-grow hover:bg-blue-600"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
      {events.length > 0 && <ShowUserEvents events={events} />}
    </div>
    <Footer/>
    </>
  );
};

export default UserHome;
