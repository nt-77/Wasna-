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
import wedding from "../assets/wedding.svg"
import { useNavigate } from "react-router-dom";
import Navbar from '../nav/Navbar'
import Footer from '../footer/Footer'

const Home = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
  
      navigate("/Login"); // Navigate to the booking portal route
    };

  // navigate("/bookingPortal"); // Navigate to the booking portal route
  return (
  <>
<Navbar/>

    <div className="flex flex-col md:flex-row min-h-screen">
    <div className="md:w-1/2 flex justify-center items-center p-10">
      {/* Text content on the right half */}
      <div>
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Dream Weddings Made Simple</h1>
        <p className="mb-4 text-gray-600">
          Congratulations, you're getting married! This is a time for joy, so definitely take it all in – make it a smoother process with joining hands with us.
        </p>
        <button  onClick={navigateToLogin} className="bg-blue-400 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition duration-300">
          Book Event
        </button>
      </div>
    </div>
    <div className="md:w-1/2 flex justify-center items-center bg-blue-400 p-10">
      {/* Background on the left half with #60A5FA shade */}
      <img src={wedding} alt="Bride" className="max-w-xs md:max-w-md lg:max-w-lg rounded-lg transform translate-x-1/12" />
    </div>
  </div>
  <Footer/>
  </>

  );
};



export default Home;