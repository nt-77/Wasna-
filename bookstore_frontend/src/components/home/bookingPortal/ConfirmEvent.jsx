import { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
const ConfirmEvent =({updateEventDetails,eventDetails})=>{
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        // Call the function here if it should run when the component mounts
        updateEventDetails();
    }, []);

    const submit = async() =>{
        try {
            await axios.post("http://localhost:5000/event", eventDetails,{
                withCredentials: true,
              });
            enqueueSnackbar('Menu customized successfully', { variant: 'success' });
            // Use navigate to redirect after successful customization
            // navigate("/bookingPortal/decor"); // Adjust "/success-route" as needed
            
          } catch (error) {
            console.error(error);
            enqueueSnackbar('Could not save eventdetails', { variant: 'error' });
          }
    }
    return(
       <button
       onClick={()=>submit()}
       className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
       >
        Confirm Event Details
       </button>
    )
}
export default ConfirmEvent