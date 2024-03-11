import { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from "notistack";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [Loading,setLoading]=useState(false)

  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const {id}=useParams();
  const newId=id.substring(1)
  const handleDelete=()=>{
    setLoading(true)
    axios.delete(`http://localhost:5000/books/${newId}`)
    .then(()=>{
      setLoading(false)
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate('/')
    })
    .catch((error)=>{
        enqueueSnackbar("Could not delete book", { variant: "error" });
        console.log(error);
      setLoading(false)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {Loading?<Spinner/>:''}
        <div className='border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto flex flex-col items-center'>
          <h3>Are you sure you want to delete this book?</h3>
          <button
          className='p-4 text-white m-8 w-full bg-red-600'
          onClick={handleDelete}>
            Delete
          </button>
        </div>
    </div>
  )
}

export default DeleteBook