
// //working:
// import React, { useState, useEffect } from "react";

// const EachCustomize = ({ items, onSelectionChange }) => {
//   // Use a state to keep track of the current selection
//   const [selectedOptions, setSelectedOptions] = useState([]);


//   // const handleOptionChange = (option) => {
//   //   if (items.item_type === "Salad") {
//   //     // For "Salad", allow multiple selections
//   //     setSelectedOptions((prev) => {
//   //       const newOptions = prev.includes(option) ? prev.filter((opt) => opt !== option) : [...prev, option];
//   //       return newOptions;
//   //     });
//   //   } else {
//   //     // For item types other than "Salad", allow only one selection
//   //     setSelectedOptions([option]);
//   //   }
//   // };

//   const handleOptionChange = (option) => {
//     if (items.item_type === "Sauce") {
//       setSelectedOptions((prev) => {
//         if (prev.includes(option)) {
//           // If the option is already selected, allow it to be deselected
//           return prev.filter((opt) => opt !== option);
//         } else {
          
//           // Only add a new selection if there are fewer than 3 selections already
//           // if (prev.length < 3) {
//           //   return [...prev, option];
//           // } else {
//           //   // Optionally, alert the user that no more than 3 selections are allowed
//           //   alert("You can only select up to 3 options for Salad.");
//           //   return prev; // Return the previous state if the limit is reached
//           // }
//         }
//       });
//     } else {
//       // For item types other than "Salad", allow only one selection
//       setSelectedOptions([option]);
//     }
//   };

//   // Use useEffect to notify the parent component about the change
//   useEffect(() => {
//     onSelectionChange(items.item_type, selectedOptions);
//   }, [selectedOptions, items.item_type, onSelectionChange]);
//   // console.log(selectedOptions);
//   return (
//     <div key={items._id}>
//       <h1>{items.item_type}</h1>
//       {items.options.map((option, index) => (
//         <label key={index} className="inline-flex items-center p-3">
//           {items.item_type === "Salad" ? (
//             <>
//               <input
//                 type="checkbox"
//                 name={items.item_type} // Ensure all radio buttons for this item type are grouped
//                 className="form-checkbox text-blue-500"
//                 value={option}
//                 checked={selectedOptions.includes(option)}
//                 onChange={() => handleOptionChange(option)}
//               />
//               <span className="ml-2">{option}</span>
//             </>
//           ) : (
//             <>
//               <input
//                 type="radio"
//                 name={items.item_type} // Group radio buttons by item type
//                 className="form-radio text-blue-500"
//                 value={option}
//                 checked={selectedOptions.includes(option)}
//                 onChange={() => handleOptionChange(option)}
//               />
//               <span className="ml-2">{option}</span>
//             </>
//           )}
//         </label>
//       ))}
//     </div>
//   );
// };

// export default EachCustomize;
import React, { useState, useEffect } from "react";

const EachCustomize = ({ category, menu, items, onSelectionChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    // Automatically select all options for "Sauce"
    // For "Dessert" under "Barat / Walima" for Menu 3 or 4, select all options automatically
    if (items.item_type === "Sauce" || 
        (items.item_type === "Dessert" && category === "Barat / Walima" && ["Menu 3", "Menu 4"].includes(menu))) {
      return items.options;
    } else {
      return [];
    }
  });

  const handleOptionChange = (option) => {
    // Prevent changes for "Sauce" and for "Dessert" under certain conditions
    if (items.item_type === "Sauce" || 
        (items.item_type === "Dessert" && category === "Barat / Walima" && ["Menu 3", "Menu 4"].includes(menu))) {
      return;
    }

    // Special rules for "Salad" and "Dessert" based on the menu and category
    const maxSelections = getMaxSelections(items.item_type);

    if (["Salad", "Dessert"].includes(items.item_type)) {
      setSelectedOptions((prev) => {
        const isNewSelection = !prev.includes(option);
        const canSelectMore = prev.length < maxSelections;
        const canDeselect = prev.includes(option);

        if (canDeselect || (isNewSelection && canSelectMore)) {
          const newOptions = isNewSelection ? [...prev, option] : prev.filter((opt) => opt !== option);
          return newOptions;
        } else {
          alert(`You can only select up to ${maxSelections} options for ${items.item_type}.`);
          return prev;
        }
      });
    } else {
      // For item types other than "Salad" and "Dessert", allow only one selection
      setSelectedOptions([option]);
    }
  };

  // Dynamic max selections based on menu, category, and item_type
  const getMaxSelections = (itemType) => {
    if (category === "Barat / Walima") {
      if (itemType === "Salad") {
        if (["Menu 1", "Menu 2"].includes(menu)) return 2;
        if (["Menu 3", "Menu 4"].includes(menu)) return 3; // Assuming default for Salad is 3 for these menus
        if ([ "Menu 5","Menu 6"].includes(menu)) return 4;
      }
      if (itemType === "Dessert" && ["Menu 5"].includes(menu)) {
        return 2; // Specific rule for Dessert under Menu 5
      }
    }
    return 3; // Default max selection for other conditions
  };

  useEffect(() => {
    // Notify the parent component about the selections
    onSelectionChange(items.item_type, selectedOptions);
  }, [selectedOptions, items.item_type, onSelectionChange]);

  const isSelectionDisabled = (itemType) => (
    itemType === "Sauce" || 
    (itemType === "Dessert" && category === "Barat / Walima" && ["Menu 3", "Menu 4"].includes(menu))
  );

  return (
    <div key={items._id}>
      <h1>{items.item_type}</h1>
      {items.options.map((option, index) => (
        <label key={index} className="inline-flex items-center p-3">
          <input
            type={["Salad", "Dessert", "Sauce"].includes(items.item_type) ? "checkbox" : "radio"}
            name={items.item_type}
            className="form-checkbox text-blue-500"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionChange(option)}
            disabled={isSelectionDisabled(items.item_type)} // Disable changes based on the conditions
          />
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default EachCustomize;
