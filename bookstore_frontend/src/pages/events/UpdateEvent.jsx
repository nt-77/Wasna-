import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import Navbar from '../../nav/Navbar';
import Footer from '../../footer/Footer'

const UpdateEvent = () => {
    const {id}=useParams();
    console.log("eventId",id);
    const newId=id.substring(1);
  const [isAvailable, setIsAvailable] = useState(true);

    // const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        venue: '',
        eventDate: '',
        guests: '',
        event_type: '',
        eventTime: '',
        customMenu: '',
        decor: '',
    });

    useEffect(() => {
        // Fetch the current event details to populate the form (not shown here)
        axios.get(`http://localhost:5000/event/${newId}`,{
            withCredentials: true,
          }).then(res => {
            // setFormData({ ...res.data });
            console.log("res.data",res.data);
            setFormData({
                name: res.data.name,
                contactNumber: res.data.contactNumber,
                email: res.data.email,
                venue: res.data.venue,
                eventDate: res.data.eventDate.substring(0, 10), // Format the date correctly for input type="date"
                guests: res.data.guests,
                event_type: res.data.event_type,
                eventTime: res.data.eventTime,
                customMenu: res.data.customMenu._id, // Assuming customMenu has an id
                decor: res.data.decor,
            })
        }).catch(err => console.log(err));
    }, [newId]);

    const checkAvailability = async () => {
        try {
            const response = await axios.post("http://localhost:5000/event/check-availability", {
                newEventDate: formData.eventDate,
                selectedVenues: [formData.venue], // Assuming venue is stored as a single string
                eventTimeselection: formData.eventTime,
            });
            // return response.data.isAvailable;
            const available = response.data.isAvailable;
            console.log("availability",available);
            setIsAvailable(available);
        } catch (error) {
            console.error("Error checking availability:", error);
            return false; // Assume not available if there's an error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         checkAvailability();
        console.log("isAvailable",isAvailable);
        if (!isAvailable) {
            alert('Venue not available on selected date and time. Please choose another date or time.');
            console.log('Venue not available on selected date and time. Please choose another date or time.');
            // return;
        }else{
        axios.put(`http://localhost:5000/event/${newId}`, formData)
            .then(response => {
                alert('Event Updated Successfully');
                // Optionally redirect or do further actions
            })
            .catch(error => {
                console.error('Error updating event:', error);
                alert('Failed to update event');
            });
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     console.log("formData",formData);
    //     e.preventDefault();
    //     axios.put(`http://localhost:5000/event/${newId}`,formData)
    //         .then(response => {
    //             alert('Event Updated Successfully');
    //             // history.push('/'); // Redirect to a different page after update
    //         })
    //         .catch(error => {
    //             console.error('Error updating event:', error);
    //             alert('Failed to update event');
    //         });
    // };

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
                <label htmlFor="name" className="block">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="contactNumber" className="block">Contact Number:</label>
                <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="email" className="block">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="venue" className="block">Venue:</label>
                <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="eventDate" className="block">Event Date:</label>
                <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="guests" className="block">Number of Guests:</label>
                <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="event_type" className="block">Event Type:</label>
                <input type="text" id="event_type" name="event_type" value={formData.event_type} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="eventTime" className="block">Event Time:</label>
                <input type="text" id="eventTime" name="eventTime" value={formData.eventTime} onChange={handleChange} required className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="customMenu" className="block">Custom Menu ID:</label>
                <input type="text" id="customMenu" name="customMenu" value={formData.customMenu} onChange={handleChange} className="border rounded p-2 w-full"/>
            </div>
            <div>
                <label htmlFor="decor" className="block">Decor Category:</label>
                <input type="text" id="decor" name="decor" value={formData.decor} onChange={handleChange} className="border rounded p-2 w-full"/>
            </div>
            <div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Event</button>
            </div>
        </form>
    </div>
    <Footer/>
    </>
    );
};

export default UpdateEvent;
