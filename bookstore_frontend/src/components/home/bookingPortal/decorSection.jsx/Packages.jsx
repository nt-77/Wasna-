import React from 'react';

const Packages = ({ categories, filterItems }) => {
  // console.log(filterItems);
  const handleClick =(category)=>{
    filterItems(category)

  }
  return (
    <div className='btn-container flex justify-center flex-wrap gap-4'>
      {categories.map((category) => (
        <button
          type='button'
          className='hover:bg-blue-600 rounded px-4 py-2 bg-blue-400 text-white '
          key={category}
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Packages;