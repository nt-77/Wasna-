import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/Createbook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import ShowBook from './pages/ShowBook'
import ShowAllDecor from './pages/decor/ShowAllDecor'
import CreateDecorItem from './pages/decor/CreateDecorItem'
import DeleteDecor from './pages/decor/DeleteDecor'
import EditDecor from './pages/decor/EditDecor'
import ShowDecor from './pages/decor/ShowDecor'
import BookingForm from './components/home/bookingPortal/BookingForm'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/decor' element={<ShowAllDecor/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/decor/create' element={<CreateDecorItem/>}/>
      <Route path='/decor/delete/:id' element={<DeleteDecor/>}/>
      <Route path='/decor/details/:id' element={<ShowDecor/>}/>
      <Route path='/decor/edit/:id' element={<EditDecor/>}/>
      <Route path='/bookingPortal' element={<BookingForm/>}/>
    </Routes>

  )
}

export default App;



// Frontend: src/App.js

// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [name, setName] = useState('');
//   const [itemType, setItemType] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [image, setImage] = useState(null);

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleAddDecorItem = async (e) => {
//     e.preventDefault();

//     if (!name || !itemType || !quantity || !image) {
//       alert('Please fill in all the required fields: name, item type, quantity, and image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('item_type', itemType);
//     formData.append('quantity', quantity);
//     formData.append('image', image);

//     try {
//       const response = await axios.post('http://localhost:5000/decor/adddecoritem', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           // Authorization: `Bearer ${yourAccessToken}`, // Add your authentication token here
//         },
//       });

//       console.log('Decor item added successfully:', response.data);
//       // Reset the form after successful submission
//       setName('');
//       setItemType('');
//       setQuantity('');
//       setImage(null);
//     } catch (error) {
//       console.error('Error adding decor item:', error);
//       alert('Error adding decor item. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleAddDecorItem}>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

//         <label>Item Type:</label>
//         <input type="text" value={itemType} onChange={(e) => setItemType(e.target.value)} />

//         <label>Quantity:</label>
//         <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

//         <label>Image:</label>
//         <input type="file" accept="image/*" onChange={handleImageChange} />

//         <button type="submit">Add Decor Item</button>
//       </form>
//     </div>
//   );
// }

// export default App;
