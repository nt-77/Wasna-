import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import BackButton from '../../components/BackButton'

const ShowDecor = () => {
  const [decor,setDecor]=useState([])
  const [loading,setLoading]=useState(false)
  const {id} = useParams()
  const formetedId= id.substring(1)
useEffect(()=>{
  setLoading(true)
  console.log(formetedId);
 axios.get(`http://localhost:5000/decor/${formetedId}`)
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

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>
        Show Decor
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
            <span className='text-xl mr-4 text-gray-500'>Item Type</span>
            <span>{decor.item_type}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Quantity</span>
            <span>{decor.quantity}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Image</span>
            {decor.image?.data && (
                <img
                    src={`data:${decor.image.contentType};base64,${decor.image.data}`}
                    alt={decor.name}
                    className="w-1/5 h-auto"
                />
                )}
            </div>
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
  )
}

export default ShowDecor