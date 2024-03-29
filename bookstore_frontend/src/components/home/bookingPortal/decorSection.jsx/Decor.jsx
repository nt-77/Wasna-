import React from "react";
import DecorItem from "./DecorItem";

const Decor = ({ items }) => {
console.log("items",items);

    const handleClick = ()=>{

    } 
  return (
    <div className="">
              {/* <h2>{price}</h2> */}
      {/* {items.map((decorItem) => { */}
        <DecorItem  item={items} />;
      {/* })} */}
{/* 
      <button 
      type='button'
      onClick={() => handleClick(category)}
      className="hover:bg-blue-600 rounded px-4 py-2 bg-blue-400 text-white ">
        click me
      </button> */}
    </div>
  );
};

export default Decor;

// className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center gap-8 max-w-[var(--max-width)] w-90vw mx-auto p-5"