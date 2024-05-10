import { AiOutlineClose } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { BiFoodMenu } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { GoPeople } from "react-icons/go";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";


const EventModal = ({ book, onClose, index }) => {
  return (
    <div
      className="fixed bg-opacity-60 z-50 top-0 bottom-0 left-0 right-0 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white relative rounded-xl w-[500px]  p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-2xl text-blue-400 cursor-pointer"
          onClick={onClose}
        />
        {/* <div className="flex "> */}
        <div className="bg-blue-300 flex w-[50px] h-[30px] m-1 rounded-lg justify-center items-center">
          <p className="">{index}</p>
        </div>
        <p className="text-gray-500 p-3">{book._id}</p>
        {/* </div> */}
        <div className="flex flex-col gap-y-3 pl-3 pb-4">
          <div className="flex gap-x-1 pb-4 items-center">
            <IoPersonCircleOutline className="text-blue-300 text-2xl" />
            <p className="pl-3">{book.name} - {book.event_type}</p>
          </div>
          <div className="flex gap-x-1 pb-4 items-center">
            <BiFoodMenu className="text-blue-300 text-2xl" />
            <p className="pl-3">{book.customMenu.title}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
            <SlCalender className="text-blue-300 text-2xl" />
            <p className="pl-2">{book.bookingDate.split('T')[0]}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
            <MdOutlinePhoneEnabled className="text-blue-300 text-2xl" />
            <p className="pl-2">{book.contactNumber}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
            <GoPeople className="text-blue-300 text-2xl" />
            <p className="pl-2">{book.guests}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
            <IoPricetagsOutline className="text-blue-300 text-2xl" />
            <p className="pl-2">{book.decor.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
