import React, { useState } from "react";
import MenuItem from "./MenuItem";
import MenuCustomization from "./MenuCustomization";

const Menu = ({ items, showMenuCustomization, setMenuCustomization,setCustomizeMenuId ,customizeMenuId}) => {
  // const [selectedMenu, setSelectedMenue] = useState([]);
  const filteredItems = items.filter(item => item._id === customizeMenuId); 
  console.log(filteredItems);
   return (
    <>
      {showMenuCustomization ? (
                <MenuCustomization
                selectedMenu={filteredItems}
                setMenuCustomization={setMenuCustomization}
                // customizeMenuId={customizeMenuId}
              />
       
      ) : (
        <div className="section-center flex gap-8 max-w-[var(--max-width)] w-90vw mx-auto justify-center">
        {items.map((menuItem) => (
          <MenuItem
            key={menuItem._id}
            {...menuItem}
            setMenuCustomization={setMenuCustomization}
            setSelectedMenu={(menuItem) => setSelectedMenue(menuItem)}
            setCustomizeMenuId={setCustomizeMenuId}
          />
        ))}
      </div>
       )} 
    </>
  );
};

export default Menu;
