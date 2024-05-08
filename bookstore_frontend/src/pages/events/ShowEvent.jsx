import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import Navbar from '../../nav/Navbar';
import Footer from '../../footer/Footer'

const ShowEvent = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/event/${id}`)
      .then((response) => {
        setEventDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className='p-4'>
        <BackButton />
        <Spinner />
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className='p-4'>
        <BackButton />
        <p className="text-xl text-center text-gray-700">Event details not found.</p>
      </div>
    );
  }

  const { name, eventDate, event_type, venue, guests, contactNumber, email, customMenu, decor } = eventDetails;
  const menuItems = customMenu.items.map((item, index) => (
    <li key={index} className="list-disc list-inside">{item.item_type}</li>
  ));

  return (
    <>  
    <Navbar/>
      <div className='p-4 '>
      <BackButton />

    <div className='p-4 flex justify-center items-center min-h-screen'>
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-full p-4'>
      <div className='flex justify-center'>
      <div className='space-y-4 justify-center items-center'>
        <h1 className='text-3xl font-bold text-gray-800'>{name} - {event_type}</h1>
        <p className='text-xl text-gray-600'>Event on: {new Date(eventDate).toLocaleDateString()} at {venue}</p>
        <p className='text-lg text-gray-600'>Hosted by: {eventDetails.user.name} ({contactNumber}, {email})</p>
        <div className='border-t border-gray-200 pt-4'>
          <h2 className='text-2xl font-semibold text-gray-800'>Guests: {guests}</h2>
          <h3 className='text-2xl font-semibold text-gray-800'>Menu: {customMenu.title}</h3>
          <ul className='text-lg text-gray-600'>{menuItems}</ul>
          <h3 className='text-2xl font-semibold text-gray-800'>Decor: {decor.category}</h3>
          <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Created at</span>
            <span>{new Date(eventDetails.createdAt).toString()}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Updated at</span>
            <span>{new Date(eventDetails.updatedAt).toString()}</span>
            </div>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    <Footer/>
    </>

  );
}

export default ShowEvent;


// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import Spinner from '../../components/Spinner'
// import BackButton from '../../components/BackButton'

// const ShowEvent = () => {
//   const [decor,setDecor]=useState(null)
//   const [loading,setLoading]=useState(false)
//   const {id} = useParams()
//   const formetedId= id.substring(0)
// useEffect(()=>{
//   setLoading(true)
//   console.log(formetedId);
//  axios.get(`http://localhost:5000/event/${formetedId}`)
//  .then((response)=>{
//     setDecor(response.data)
//   console.log(response);
//   setLoading(false)
//  })
//  .catch((error)=>{
//   console.log(error);
//   setLoading(true)
//  })
// },[])
// if (!decor) {
//   return (
//     <div className='p-4'>
//       <BackButton />
//     <Spinner/>
//     </div>
//   );
// }
//   return (
//     <div className='p-4'>
//       <BackButton/>
//       <h1 className='text-3xl my-4'>
//         Show Decor
//       </h1>
//       {loading? (
//         <Spinner/>
//       ): (
//         <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
//           <div className='p-4'>
//             <span className='text-xl mr-4 text-gray-500'>Id</span>
//             <span>{decor._id}</span>
//             </div>
//             <div className='p-4'>
//             <span className='text-xl mr-4 text-gray-500'>Category</span>
//             <span>{decor.category}</span>
//             </div>
//             <div className='p-4'>
//             <span className='text-xl mr-4 text-gray-500'>Price</span>
//             <span>Rs {decor.price}</span>
//             </div>
//             <div className='p-4'>
//             <span className='text-xl mr-4 text-gray-500'>Image</span>
//                   <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
//         {decor.images.map((image) => (
//           <div key={image._id} className="p-2 border rounded shadow">
//             <img
//               src={image.img_url}
//               alt={image.imageName} // Use imageName as alt text
//               className="w-full h-auto" // Use full width of the parent container, height auto for aspect ratio
//             />
//           </div>
//            ))}
//            </div>
//             </div>
//             <div className='p-4'>
//             <span className='text-xl mr-4 text-gray-500'>Created at</span>
//             <span>{new Date(decor.createdAt).toString()}</span>
//             </div>
//             <div className='p-4'>
//             <span className='text-xl mr-4 text-gray-500'>Updated at</span>
//             <span>{new Date(decor.updatedAt).toString()}</span>
//             </div>
//           </div>
          
//       )}
//     </div>
//   )
// }

// export default ShowEvent