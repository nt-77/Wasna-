import { AiOutlineClose } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
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
          <div className="flex gap-x-1 items-center">
            <BiCategoryAlt className="text-blue-300 text-2xl" />
            <p className="pl-3">{book.category}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
            <IoPricetagsOutline className="text-blue-300 text-2xl" />
            <p className="pl-2">{book.price}</p>
          </div>
          <div className='grid grid-cols-3  gap-4'>
        {book.images.map((image) => (
          <div key={image._id} className="p-2 border rounded shadow">
            <img
              src={image.img_url}
              alt={image.imageName} // Use imageName as alt text
              className="w-full h-auto" // Use full width of the parent container, height auto for aspect ratio
            />
          </div>
           ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
