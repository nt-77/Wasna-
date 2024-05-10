import { useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
const ConfirmEvent =({decor,customMenu,formData})=>{
    const { enqueueSnackbar } = useSnackbar();

    const submit = async() =>{
        try {
          // console.log("decor",decor);
          // console.log("customMenu",customMenu);
          // console.log("formData",formData);
          const eventDetails = { // Directly construct the details here
            decor: decor,
            customMenu: customMenu,
            ...formData
        };
        console.log("eventdetailsBeforeFinalSubmit",eventDetails);
        
            await axios.post("http://localhost:5000/event/", eventDetails,{
                withCredentials: true,
              });
            enqueueSnackbar('Event saved successfully', { variant: 'success' });
            // Use navigate to redirect after successful customization
            // navigate("/bookingPortal/decor"); // Adjust "/success-route" as needed
            
          } catch (error) {
            console.error(error);
            enqueueSnackbar('Could not save eventdetails', { variant: 'error' });
          }
    }
    return(
      <div className="flex justify-center pb-8">
       <button
       onClick={()=>submit()}
       className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
       >
        Finish event booking
       </button>
       </div>
    )
}
export default ConfirmEvent