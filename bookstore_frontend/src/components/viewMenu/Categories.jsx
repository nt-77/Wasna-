import React from 'react';

const Categories = ({ categories, filterItems,setMenuCustomization }) => {

  const handleClick =(category)=>{
    filterItems(category)
    setMenuCustomization(false)

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

export default Categories;
// bg-primary-500 hover:bg-primary-700