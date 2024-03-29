// import { useState } from "react";
// import BackButton from "../../components/BackButton";
// import Spinner from "../../components/Spinner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";

// const CreateDecorItem = () => {
//   const [name, setName] = useState("");
//   const [item_type, setItem_type] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const handleSubmit = () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("item_type", item_type);
//     formData.append("quantity", quantity);
//     formData.append("image", image);
  
//     setLoading(true);
//     axios
//       .post("http://localhost:5000/decor/adddecoritem", formData)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Decor item created successfully', { variant: 'success' })
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error);
//         enqueueSnackbar('Could not create decor item', { variant: 'error' })
//         setLoading(false);
//       });
//   };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };
//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">Create Decor Item</h1>
//       {loading ? <Spinner /> : ""}
//       <div className="border-2 flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Name</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="text"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//           />
//         </div>
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Item type</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="text"
//             onChange={(e) => setItem_type(e.target.value)}
//             value={item_type}
//           />
//         </div>
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Item quantity</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="number"
//             onChange={(e) => setQuantity(e.target.value)}
//             value={quantity}
//           />
//         </div>
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Add Image</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange} 
//           />
//         </div>
//         <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
//           save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateDecorItem;

//working
// import { useState } from "react";
// import BackButton from "../../components/BackButton";
// import Spinner from "../../components/Spinner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";

// const CreateDecorItem = () => {
//   // const [name, setName] = useState("");
//   // const [item_type, setItem_type] = useState("");
//   // const [quantity, setQuantity] = useState("");
//   const [category, setCategory] = useState("");
//   const [images, setImages] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleSubmit = () => {
//     const formData = new FormData();
//     // formData.append("name", name);
//     // formData.append("item_type", item_type);
//     formData.append("category", category);
//     // images.forEach((image, index) => {
//       // formData.append(`image${index}`, image);
//       formData.append("images", images);

//     // });
  

//     setLoading(true);
//     axios
//       .post("http://localhost:5000/decor/adddecoritem", formData)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar("Decor item created successfully", {
//           variant: "success",
//         });
//         // navigate("/");
//       })
//       .catch((error) => {
//         console.log(error);
//         enqueueSnackbar("Could not create decor item", { variant: "error" });
//         setLoading(false);
//       });
//   };

//   const handleImageChange = (e) => {
//     // const selectedImages = Array.from(e.target.files);
//     // setImages(selectedImages);
//     const selectedImage = e.target.files[0]; // Select only the first image
//     setImages(selectedImage);
//   };

//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">Create Decor Item</h1>
//       {loading ? <Spinner /> : ""}
//       <div className="border-2 flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
//        {/*  <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Name</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="text"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//           />
//         </div> */}
//         {/* <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Item type</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="text"
//             onChange={(e) => setItem_type(e.target.value)}
//             value={item_type}
//           />
//         </div> */}
//         {/* <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Item quantity</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="number"
//             onChange={(e) => setQuantity(e.target.value)}
//             value={quantity}
//           />
//         </div> */}
//                 <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">category</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="string"
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//           />
//         </div>
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Add Images</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//         </div>
//         <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };


// export default CreateDecorItem;

// import { useState } from "react";
// import BackButton from "../../components/BackButton";
// import Spinner from "../../components/Spinner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";

// const CreateDecorItem = () => {
//   const [category, setCategory] = useState("");
//   const [images, setImages] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleSubmit = () => {
//     const formData = new FormData();
//     formData.append("category", category);
//     formData.append("price", getPriceByCategory(category)); // Assuming you have a function to get the price based on the category
//     images.forEach((image) => {
//       formData.append("images", image);
//     });

//     setLoading(true);
//     axios
//       .post("http://localhost:5000/decor/adddecoritem", formData)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar("Decor item created successfully", {
//           variant: "success",
//         });
//         // Reset form after successful submission if needed
//         setCategory("");
//         setImages(null);
//       })
//       .catch((error) => {
//         console.log(error);
//         enqueueSnackbar("Could not create decor item", { variant: "error" });
//         setLoading(false);
//       });
//   };

//   const handleImageChange = (e) => {
//     const selectedImages = Array.from(e.target.files);
//     setImages(selectedImages);
//   };

//   // Helper function to get price based on category (you need to implement this)
//   const getPriceByCategory = (category) => {
//     switch (category) {
//       case "silver":
//         return 45000;
//       case "gold":
//         return 100000;
//       case "platinum":
//         return 200000;
//       default:
//         return 0; // Default price or handle error case
//     }
//   };

//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">Create Decor Item</h1>
//       {loading ? <Spinner /> : ""}
//       <div className="border-2 flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Category</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="string"
//             onChange={(e) => setCategory(e.target.value)}
//             value={category}
//           />
//         </div>
//         <div className="p-4">
//           <label className="text-gray-500 mr-4 text-xl">Add Images</label>
//           <input
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//         </div>
//         <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateDecorItem;


import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateDecorItem = () => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0); // Added state for price
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("price", price); // Use the state for price
    images.forEach((image) => {
      formData.append("images", image);
    });

    setLoading(true);
    axios
      .post("http://localhost:5000/decor/adddecoritem", formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Decor item created successfully", {
          variant: "success",
        });
        // Reset form after successful submission if needed
        setCategory("");
        setPrice(0); // Reset price to 0
        setImages(null);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Could not create decor item", { variant: "error" });
        setLoading(false);
      });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Decor Item</h1>
      {loading ? <Spinner /> : ""}
      <div className="border-2 flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Category</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="string"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Price</label> {/* Added price input field */}
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="number"
            onChange={(e) => setPrice(parseFloat(e.target.value))} // Convert value to float
            value={price}
          />
        </div>
        <div className="p-4">
          <label className="text-gray-500 mr-4 text-xl">Add Images</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateDecorItem;

