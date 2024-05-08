
import MEventSingleCardDisplay from "./MEventSingleCardDisplay";
// eslint-disable-next-line react/prop-types
const EventCardDisplay = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {books.map((item,index) => (
        <MEventSingleCardDisplay key={item._id} book={item} index={index} />
      ))}
    </div>  
  );
};

export default EventCardDisplay;
