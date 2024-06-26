
import DecorSingleCard from "./DecorSingleCard";
// eslint-disable-next-line react/prop-types
const DecorCardDisplay = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {books.map((item,index) => (
        <DecorSingleCard key={item._id} book={item} index={index} />
      ))}
    </div>  
  );
};

export default DecorCardDisplay;
