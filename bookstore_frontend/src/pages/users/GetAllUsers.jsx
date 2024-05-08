import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import UserTableDisplay from "../../components/home/user/UserTableDisplay";
import DecorCardDisplay from "../../components/home/decor/DecorCardDisplay";
import { BsTruckFlatbed } from "react-icons/bs";
import BackButton from "../../components/BackButton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/user/getAll",{
        withCredentials:true
      })
      .then((response) => {
        console.log("response.data.data",response.data.data);
        setItems(response.data.data);
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
      <BackButton/>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">User List</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : showCard ? (
        <DecorCardDisplay books={items}  />
      ) : (
        <UserTableDisplay books={items} />
      )}

    </div>
  );
};

export default Home;
