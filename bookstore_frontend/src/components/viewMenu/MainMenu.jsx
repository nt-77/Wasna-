// Step1.js (similar structure for Step2 and Step3)
import React, { useState, useEffect } from "react";
import Spinner from "../Spinner.jsx";
import axios from "axios";
import Categories from "./Categories.jsx";
import Title from "../home/bookingPortal/FoodSection.jsx/Title.jsx";
import Menu from "./Menu.jsx";
import Navbar from "../../nav/Navbar.jsx";
import Footer from "../../footer/Footer.jsx";

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
    <div className="">
      {loading ? (
        <Spinner />
      ) : (
        <section >
          <Navbar/>
          <Title text="our menu" />
          <Categories categories={categories} filterItems={filterItems}  setMenuCustomization={setMenuCustomization}/>
          <Menu setIsCustomized={setIsCustomized} items={filteredMenuItems} showMenuCustomization={showMenuCustomization} setMenuCustomization={setMenuCustomization} setCustomizeMenuId={setCustomizeMenuId} customizeMenuId={customizeMenuId} setCustomMenu={setCustomMenu}/>
          <Footer/>
        </section>
    )}

    </div>
  );
};

export default Step2;
