import { PiBookOpenTextDuotone } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
const DecorModal = ({ book, onClose }) => {
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
          className="absolute right-6 top-6 text-2xl text-red-400 cursor-pointer"
          onClick={onClose}
        />
        {/* <div className="flex "> */}
        <div className="bg-red-300 w-[50px] h-[30px] m-1 rounded-lg justify-center items-center">
          <p className="ml-2 mt-1">{book.quantity}</p>
        </div>
        <p className="text-gray-500 p-3">{book._id}</p>
        {/* </div> */}
        <div className="flex flex-col gap-y-3 pl-3 pb-4">
          <div className="flex gap-x-1 items-center">
            <PiBookOpenTextDuotone className="text-red-300 text-2xl" />
            <p className="">{book.name}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
            <IoPersonCircleOutline className="text-red-300 text-2xl" />
            <p className="">{book.item_type}</p>
          </div>
          <div className="flex gap-x-2 items-center pb-4">
          {book.image?.data && (
                  <img
                      src={`data:${book.image.contentType};base64,${book.image.data}`}
                      alt={book.name}
                      className="w-1/2 h-auto"
                  />
              )}
              </div>
          <h6>Anything i want to display!!</h6>
          <p>
            Aliquam vel efficitur dui. Aenean non justo magna. Nulla id magna
            nec urna congue volutpat vitae vitae eros. Aenean dictum orci ut
            felis mollis, eu gravida dolor interdum. Vivamus metus urna, ornare
            in enim non, ullamcorper condimentum urna. Integer nulla ex,
            ultricies id vehicula vel, iaculis in quam. Integer lacinia lacus
            vel elit sagittis vestibulum. Phasellus vel urna venenatis, posuere
            quam vel, placerat eros. Duis sodales vehicula nulla, et tincidunt
            lectus volutpat finibus. Fusce non diam tortor. Maecenas gravida
            dictum ante sed suscipit. Cras quis mi lacus. Nullam eu quam
            facilisis nisi pulvinar tristique. In interdum justo ac massa
            cursus, ac congue nisi efficitur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecorModal;
