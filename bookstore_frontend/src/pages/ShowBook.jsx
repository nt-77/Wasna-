import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const ShowBook = () => {
  const [book,setBook]=useState([])
  const [loading,setLoading]=useState(false)
  const {id} = useParams()
  const formetedId= id.substring(1)
useEffect(()=>{
  setLoading(true)
  console.log(formetedId);
 axios.get(`http://localhost:5000/books/${formetedId}`)
 .then((response)=>{
  setBook(response.data)
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
        Show Book
      </h1>
      {loading? (
        <Spinner/>
      ): (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Created at</span>
            <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='p-4'>
            <span className='text-xl mr-4 text-gray-500'>Updated at</span>
            <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
          
      )}
    </div>
  )
}

export default ShowBook