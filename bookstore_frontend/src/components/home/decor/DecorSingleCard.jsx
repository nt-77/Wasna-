
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import DecorModal from "./DecorModal";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
// eslint-disable-next-line react/prop-types
const BookSingleCard = ({ book ,index}) => {
  const [show, setShow] = useState(false);
  return (
    <div

      key={book._id}
      className="border-2 bg-white border-gray-500 rounded-lg w-[350px] m-4 relative"
    >
      <div className="flex ">
        <p className="text-gray-500  p-3">{book._id}</p>
        <div className="bg-blue-300 flex w-[50px] h-[30px] ml-auto m-1 rounded-lg justify-center items-center">
          <p className="justify-center items-center"> {index + 1}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 pl-3 pb-4 ">
        <div className="flex gap-x-1 items-center">
          <BiCategoryAlt className="text-blue-400 text-xl" />
          <p className="pl-3">{book.category}</p>
        </div>
        <div className="flex gap-x-2 items-center pb-4">
        <IoPricetagsOutline className="text-blue-400 text-xl" />
          <p className="pl-2">{book.price}</p>
        </div>
        <div className="flex justify-center gap-x-20 ">
          <BiShow
            className="text-2xl text-sky-800 cursor-pointer"
            onClick={() => setShow(true)}
          /> 
          {show && <DecorModal book={book} index={index +1} onClose={()=>setShow(false)}/>}
          <Link to={`/decor/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-800" />
          </Link>
          {/* <Link to={`/decor/edit/:${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-800" />
          </Link> */}
          <Link to={`/decor/delete/:${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-800" />
          </Link>
         </div>
      </div>
    </div>
  );
};

export default BookSingleCard;
