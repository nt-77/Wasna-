import React from "react";
import DecorItem from "./DecorItem";

const Decor = ({ items ,setDecor,decor}) => {
console.log("items",items);
console.log("decor on decor page",decor);
  
  return (
    <div className="">
              {/* <h2>{price}</h2> */}
      {/* {items.map((decorItem) => { */}
        <DecorItem  item={items} />;
      {/* })} */}


    </div>
  );
};

export default Decor;

// className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center gap-8 max-w-[var(--max-width)] w-90vw mx-auto p-5"