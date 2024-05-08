import { useState } from 'react'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import { useSnackbar } from "notistack";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteEvent = () => {
  const [Loading,setLoading]=useState(false)

  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const {id}=useParams();
  const newId=id.substring(1)
  const handleDelete=()=>{
    setLoading(true)
    axios.delete(`http://localhost:5000/event/${newId}`, {
        withCredentials: true,
      })
    .then(()=>{
      setLoading(false)
        enqueueSnackbar("Event deleted successfully", { variant: "success" });
        navigate('/dashboard')
    })
    .catch((error)=>{
        enqueueSnackbar("Could not delete Event", { variant: "error" });
        console.log(error);
      setLoading(false)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Decor Item</h1>
      {Loading?<Spinner/>:''}
        <div className='border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto flex flex-col items-center'>
          <h3>Are you sure you want to delete this item?</h3>
          <button
          className='p-4 text-white m-8 w-full bg-red-600'
          onClick={handleDelete}>
            Delete
          </button>
        </div>
    </div>
  )
}

export default DeleteEvent