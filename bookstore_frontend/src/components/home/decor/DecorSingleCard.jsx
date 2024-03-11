import { PiBookOpenTextDuotone } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import DecorModal from "./DecorModal";

// eslint-disable-next-line react/prop-types
const BookSingleCard = ({ book }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      // eslint-disable-next-line react/prop-types
      key={book._id}
      className="border-2 border-gray-500 rounded-lg w-[350px] m-4 relative"
    >
      <div className="flex ">
        <p className="text-gray-500 p-3">{book._id}</p>
        <div className="bg-red-300 w-[50px] h-[30px] ml-auto m-1 rounded-lg justify-center items-center">
          <p className="ml-2 mt-1">{book.quantity}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 pl-3 pb-4">
        <div className="flex gap-x-1 items-center">
          <PiBookOpenTextDuotone className="text-red-300 text-2xl" />
          <p className="">{book.name}</p>
        </div>
        <div className="flex gap-x-2 items-center pb-4">
          <IoPersonCircleOutline className="text-red-300 text-2xl" />
          <p className="">{book.item_type}</p>
        </div>
        <div className="flex justify-center gap-x-20 ">
          <BiShow
            className="text-2xl text-sky-800 cursor-pointer"
            onClick={() => setShow(true)}
          /> 
          {show && <DecorModal book={book} onClose={()=>setShow(false)}/>}
          <Link to={`/decor/details/:${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/decor/edit/:${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-800" />
          </Link>
          <Link to={`/decor/delete/:${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-800" />
          </Link>
         </div>
      </div>
    </div>
  );
};

export default BookSingleCard;
