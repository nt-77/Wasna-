
import React, { useState, useEffect }from 'react';
import Spinner from '../../Spinner';
import axios from 'axios';
import Packages from './decorSection.jsx/Packages';
import Title from "./FoodSection.jsx/Title";
import Decor from './decorSection.jsx/Decor';

const Step3 = ({ data, handleChange, prevStep,setDecor }) => {

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/decor")
      .then((response) => {
        const decorData = response.data.data;
        setFilteredMenuItems(decorData);
        setMenuItems(decorData);
        const allCategories = [
          ...new Set(decorData.map((item) => item.category)),
        ];
        setCategories(allCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  const filterItems = (category) => {

    const newItems = menuItems.filter((item) => item.category === category);
    setFilteredMenuItems(newItems);
    // console.log("newItems",newItems);
  
  };
  

  // useEffect(() => {
  //   console.log("Categories:", categories);
  // }, [categories]);

  const decor_items=filteredMenuItems[0]
  // console.log("decor_items",decor_items);


  return (
    <div>
      <h2>Step 3: Decor Selection</h2>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <Title text="our decor packages" />
          <Packages categories={categories} filterItems={filterItems} />
          <Decor items={decor_items} setDecor={setDecor}/>

          {/* <Menu items={filteredMenuItems} showMenuCustomization={showMenuCustomization} setMenuCustomization={setMenuCustomization} setCustomizeMenuId={setCustomizeMenuId} customizeMenuId={customizeMenuId}/> */}
        </section>
      )}
      <div className="flex justify-between p-5">
        <button
          onClick={prevStep}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Back
        </button>
      </div>
    </div>
  );

};

export default Step3;

