// Step1.js (similar structure for Step2 and Step3)
import React, { useState, useEffect } from "react";
import Spinner from "../../Spinner";
import axios from "axios";
import Categories from "./FoodSection.jsx/Categories";
import Title from "./FoodSection.jsx/Title";
import Menu from "./FoodSection.jsx/Menu";
import Step3 from "./Step3";

const Step2 = ({ data, handleChange, nextStep, prevStep,setCustomMenu ,setDecor}) => {
  const [categories, setCategories] = useState([]);
  const [showMenuCustomization, setMenuCustomization] = useState(false);
  const [customizeMenuId, setCustomizeMenuId] = useState([]);
  const [isCustomized, setIsCustomized] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/menu")
      .then((response) => {
        const menuData = response.data.data;
        setFilteredMenuItems(menuData);
        setMenuItems(menuData);
        const allCategories = [
          "all",
          ...new Set(menuData.map((item) => item.category)),
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
    if (category !== "all") {
      const newItems = menuItems.filter((item) => item.category === category);
      setFilteredMenuItems(newItems);
    } else {
      // If 'all' is selected, reset to the original menu items
      setFilteredMenuItems(menuItems);
    }
  };

  useEffect(() => {
    console.log("Categories:", categories);
  }, [categories]);

  return (
    <div>

      {loading ? (
        <Spinner />
      ) : (
        isCustomized? (<Step3 setDecor={setDecor}/>): 
        (        
        <section>
                <h2>Step 2: Decor Selection</h2>
          <Title text="our menu" />
          <Categories categories={categories} filterItems={filterItems}  setMenuCustomization={setMenuCustomization}/>
          <Menu setIsCustomized={setIsCustomized} items={filteredMenuItems} showMenuCustomization={showMenuCustomization} setMenuCustomization={setMenuCustomization} setCustomizeMenuId={setCustomizeMenuId} customizeMenuId={customizeMenuId} setCustomMenu={setCustomMenu}/>
          <div className="flex justify-between p-5">
        <button
          onClick={prevStep}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Next
        </button>
      </div>
        </section>)

      )}

    </div>
  );
};

export default Step2;
