// import React, { useState,useCallback } from "react";
// import axios from "axios";
// import EachCustomize from "./EachCustomize";
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";
// import Step3 from "../Step3";
// const MenuCustomization = ({ selectedMenu }) => {
//   const [selections, setSelections] = useState({});
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleSelectionChange = useCallback((itemType, options) => {
//     setSelections((prevSelections) => ({
//       ...prevSelections,
//       [itemType]: options,
//     }));
//   }, []);
//   console.log(selections);

//   const validateSelections = () => {
//     for (const item of selectedMenu[0].items) {
//       if (item.options.length > 0 && (!selections[item.item_type] || selections[item.item_type].length === 0)) {
//         return false; // Found an item type with options that has no selections
//       }
//     }
//     return true; // All item types with options have at least one selection
//   };

//   const handleConfirm = async () => {
//     if (!validateSelections()) {
//       alert('Please select at least one option for each item type.');
//       console.log('Please select at least one option for each item type.');
//       return; // Stop the confirmation process if validation fails
//     }
//     const customizedMenuData = {
//       title: selectedMenu[0].title, // Assuming selectedMenu[0] is the current menu being customized
//       category: selectedMenu[0].category,
//       description: selectedMenu[0].description,
//       price: selectedMenu[0].price,
//       items: Object.entries(selections).map(([itemType, options]) => ({
//         item_type: itemType,
//         options, // Adjusted from your code to match the schema
//       })),
//     // console.log(selections);
//   };
  
 
//     axios
//     .post("http://localhost:5000/customMenu", customizedMenuData)
//     .then(() => {
//       enqueueSnackbar('Menu customized successfully',{variant:'success'});
//      { <Step3/>}
//     })
//     .catch((error) => {
//       console.log(error);
//       enqueueSnackbar('Could not customize menu',{variant:'error'})
//     });
  

//   }

//   return (
//     <div className="max-w-md mx-auto my-8">
//       <h2 className="text-2xl font-bold mb-4">
//         Customizing {selectedMenu[0].title}
//       </h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             {selectedMenu[0].items.map((item) => (
//               <EachCustomize
//                 key={item._id}
//                 items={item}
//                 menu={selectedMenu[0].title}
//                 category={selectedMenu[0].category}
//                 onSelectionChange={handleSelectionChange}
//               />
//             ))}
//             <button onClick={() => handleConfirm}>Confirm</button>
//           </label>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MenuCustomization;

import React, { useState, useCallback } from "react";
import axios from "axios";
import EachCustomize from "./EachCustomize";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Step3 from "../Step3";

const MenuCustomization = ({ selectedMenu ,setIsCustomized}) => {
  const [selections, setSelections] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSelectionChange = useCallback((itemType, options) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [itemType]: options,
    }));
  }, []);

  const validateSelections = () => {
    for (const item of selectedMenu[0].items) {
      if (item.options.length > 0 && (!selections[item.item_type] || selections[item.item_type].length === 0)) {
        return false; // Found an item type with options that has no selections
      }
    }
    return true; // All item types with options have at least one selection
  };

  const handleConfirm = async () => {
  console.log(selections);

    if (!validateSelections()) {
      enqueueSnackbar('Please select at least one option for each item type.', { variant: 'warning' });
      return; // Stop the confirmation process if validation fails
    }
    const customizedMenuData = {
      title: selectedMenu[0].title,
      category: selectedMenu[0].category,
      description: selectedMenu[0].description,
      price: selectedMenu[0].price,
   items: Object.entries(selections).map(([itemType, options]) => ({
        item_type: itemType,
        options: options

      })),        // items: Object.entries(selections).map(([itemType, options]) => ({
      //   item_type: itemType,
      //   option: options
      // })),
    };


    try {
      await axios.post("http://localhost:5000/customMenu", customizedMenuData);
      enqueueSnackbar('Menu customized successfully', { variant: 'success' });
      // Use navigate to redirect after successful customization
      // navigate("/bookingPortal/decor"); // Adjust "/success-route" as needed
      setIsCustomized(true); 
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Could not customize menu', { variant: 'error' });
    }
  };

  return (
  <div className="max-w-md mx-auto my-8 shadow-lg py-4 m-4">
      <h2 className="text-3xl  mb-4 text-center ">Customizing {selectedMenu[0].title}</h2>
      <form>
        {selectedMenu[0].items.map((item) => (
          <EachCustomize
            key={item._id}
            items={item}
            menu={selectedMenu[0].title}
            category={selectedMenu[0].category}
            onSelectionChange={handleSelectionChange}
          />
        ))}
        <button type="button" onClick={handleConfirm} className="block mx-auto bg-blue-400 text-white py-2 px-6 rounded-md rounded hover:bg-blue-600 m-8" >Confirm</button>
      </form>
    
    </div>)

};

export default MenuCustomization;
