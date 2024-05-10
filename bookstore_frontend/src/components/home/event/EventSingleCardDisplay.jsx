
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import EventModal from "./EventModal";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { GoPeople } from "react-icons/go";
// eslint-disable-next-line react/prop-types
const BookSingleCard = ({ book ,index}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      key={book._id}
      className="border-2 bg-white border-gray-500 rounded-lg w-[350px] m-4 relative"
    >
      <div className="flex ">
        <p className="text-gray-500  p-3">{book.name} - {book.event_type}</p>
        <div className="bg-blue-300 flex w-[50px] h-[30px] ml-auto m-1 rounded-lg justify-center items-center">
          <p className="justify-center items-center"> {index + 1}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 pl-3 pb-4 ">
        <div className="flex gap-x-2  pb-4 items-center">
          <SlCalender className="text-blue-400 text-xl" />
          <p className="pl-3">{book.bookingDate.split('T')[0]}</p>
        </div>
        <div className="flex gap-x-2 items-center pb-4">
        <IoLocationOutline className="text-blue-400 text-xl" />
          <p className="pl-2">{book.venue}</p>
        </div>
        <div className="flex gap-x-2 items-center pb-4">
        <IoMdTime className="text-blue-400 text-xl" />
          <p className="pl-2">{book.eventTime}</p>
        </div>
        <div className="flex gap-x-2 items-center pb-4">
        <GoPeople  className="text-blue-400 text-xl" />
          <p className="pl-2">{book.guests}</p>
        </div>
        <div className="flex justify-center gap-x-20 ">
          <BiShow
            className="text-2xl text-sky-800 cursor-pointer"
            onClick={() => setShow(true)}
          /> 
          {show && <EventModal book={book} index={index +1} onClose={()=>setShow(false)}/>}
          <Link to={`/event/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          <Link to={`/event/user/edit/:${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-800" />
          </Link>
         </div>
      </div>
    </div>
  );
};

export default BookSingleCard;
