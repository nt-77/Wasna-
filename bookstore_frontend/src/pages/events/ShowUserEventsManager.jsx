import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import MEventTableDispaly from '../../components/home/event/MEventTableDisplay';
import MEventCardDisplay from "../../components/home/event/MEventCardDisplay";

const ShowUserEvents = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/event/",{
        withCredentials: true,
      })
      .then((response) => {
        console.log("response.data.data",response.data);
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    console.log("Items loaded:", items.map(item => item.bookingDate));
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    console.log("Comparison Date (Today's date at 0:0:0):", now);

    switch (filter) {
        case 'future':
            console.log("Filtering future events");
            setFilteredItems(items.filter(item => new Date(item.bookingDate).setHours(0, 0, 0, 0) >= now.getTime()));
            break;
        case 'previous':
            console.log("Filtering previous events");
            setFilteredItems(items.filter(item => new Date(item.bookingDate).setHours(0, 0, 0, 0) < now.getTime()));
            break;
        case 'all':
            console.log("Showing all events");
            setFilteredItems(items);
            break;
        default:
            setFilteredItems([]);
    }
}, [items, filter]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Event List</h1>
        <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
    <select
      value={filter}
      onChange={e => setFilter(e.target.value)}
      className="bg-white border border-gray-500 text-gray-700 text-bold py-2 px-4 rounded leading-tight focus:outline-none focus:border-gray-500"
    >
      <option value="future">Upcoming Events</option>
      <option value="previous">Previous Events</option>
      <option value="all">View All</option>
    </select>
</div>
</div>
      </div>
      {loading ? (
        <Spinner />
      ) : showCard ? (
        <MEventCardDisplay books={filteredItems}  />
      ) : (
        <MEventTableDispaly books={filteredItems} />
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

export default ShowUserEvents;
