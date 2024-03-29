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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center gap-8 max-w-[var(--max-width)] w-90vw mx-auto p-5">
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
// flex gap-8 max-w-[var(--max-width)] w-90vw mx-auto 