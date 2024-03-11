import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import TableDisplay from "../components/home/TableDisplay";
import CardDisplay from "../components/home/CardDisplay";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showCard ? (
        <CardDisplay books={books}  />
      ) : (
        <TableDisplay books={books} />
      )}
      <div className=" flex items-center gap-x-4 justify-left pl-2">
        <button
          onClick={() => setShowCard(true)}
          className="bg-sky-300 rounded-lg py-1 px-4 hover:bg-sky-500"
        >
          Card View
        </button>
        <button
          onClick={() => setShowCard(false)}
          className="bg-sky-300 rounded-lg py-1 px-4 hover:bg-sky-500"
        >
          Table View
        </button>
      </div>
    </div>
  );
};

export default Home;
