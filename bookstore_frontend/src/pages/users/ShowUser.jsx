import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import BackButton from '../../components/BackButton'
import Navbar from '../../nav/Navbar'
import Footer from '../../footer/Footer'

const ShowDecor = () => {
  const [decor,setDecor]=useState(null)
  const [loading,setLoading]=useState(false)
  const {id} = useParams()
  const formetedId= id.substring(0)
useEffect(()=>{
  setLoading(true)
  console.log(formetedId);
 axios.get(`http://localhost:5000/api/user/client/${formetedId}`,{withCredentials:true})
 .then((response)=>{
    setDecor(response.data)
  console.log(response);
  setLoading(false)
 })
 .catch((error)=>{
  console.log(error);
  setLoading(true)
 })
},[])
if (!decor) {
  return (
    <div className='p-4'>
      <BackButton />
    <Spinner/>
    </div>
  );
}
  return (
    <>
    <Navbar/>
        <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>
        Show User
      </h1>
      {loading? (
        <Spinner/>
      ): (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{decor._id}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Name</span>
            <span>{decor.name}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Email</span>
            <span> {decor.email}</span>
            </div>
            {/* <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Image</span>
                   <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {decor.images.map((image) => (
          <div key={image._id} className="p-2 border rounded shadow">
            <img
              src={image.img_url}
              alt={image.imageName} // Use imageName as alt text
              className="w-full h-auto" // Use full width of the parent container, height auto for aspect ratio
            />
          </div>
           ))}
           </div> 
            </div> */}
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Created at</span>
            <span>{new Date(decor.createdAt).toString()}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Updated at</span>
            <span>{new Date(decor.updatedAt).toString()}</span>
            </div>
          </div>
          
      )}
    </div>
    <Footer/>
    </>
  )
}

export default ShowDecor