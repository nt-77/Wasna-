
import React, { useState, useEffect }from 'react';
import Spinner from '../Spinner';
import axios from 'axios';
import Packages from './Packages';
import Title from "../home/bookingPortal/FoodSection.jsx/Title";
import Decor from './Decor';
import Navbar from '../../nav/Navbar';

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
    <>
    <Navbar/>
    <div className='pt-8'>
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
    </div>
    </>
  );

};

export default Step3;

