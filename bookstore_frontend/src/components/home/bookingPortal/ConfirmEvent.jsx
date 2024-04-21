import { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
const ConfirmEvent =({decor,customMenu})=>{
    const { enqueueSnackbar } = useSnackbar();
    // useEffect(() => {
    //     // Call the function here if it should run when the component mounts
    //     updateEventDetails(decor,customMenu);
    //     console.log("event details before saving",eventDetails);
    // }, []);
    // console.log("eventdetailsBeforeFinalSubmit",eventDetails);

    const submit = async() =>{
        try {
          console.log("decor",decor);
          console.log("customMenu",customMenu);
          const eventDetails = { // Directly construct the details here
            decor: decor,
            customMenu: customMenu
        };
        console.log("eventdetailsBeforeFinalSubmit",eventDetails);
        
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