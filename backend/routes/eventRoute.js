import express from 'express'
import {Event} from '../models/models.js'
import {User} from '../models/models.js'
import { CustomMenu } from '../models/models.js';
import jwt from 'jsonwebtoken'

import protect from '../middleWare/authMiddleWare.js';

// import {JWT_SECRET} from '../config.js'
// import {User} from '../models/models.js'
const router=express.Router()


// Route to create a new event
router.post('/',protect, async (req, res) => {
    const user=req.user;
    console.log("working");
    console.log("user",user);

    console.log(req.body);
    const {  customMenu, decor,eventDate,venue,name,contactNumber,email,guests,event_type, eventTime} = req.body;
    console.log("customMenu",customMenu);
  
    try {
      // Create a new event with the provided details
      const event = new Event({
        user: user._id,
        customMenu: customMenu, // This is an array of custom menu objects
        decor: decor, // This is the ID of the chosen decor
        name:name,
        contactNumber:contactNumber,
        email:email,
        venue:venue,
        eventDate: new Date(eventDate),
        guests: guests,
        event_type: event_type,
        eventTime: eventTime
      });
  
      // Save the event to the database
      await event.save();
  
      res.status(201).send(event);
    } catch (error) {
      res.status(400).json({ message: 'Error creating event', error: error.message });
    }
  });

  router.get('/myevents', protect, async (req, res) => {
    const user=req.user;
    console.log("user id", user._id.toString());
      try {
  
  
        // Assuming the user ID is stored in 'decoded.id' 
        // Fetch events where the 'user' field matches the logged-in user's ID
        const events = await Event.find({ user: user._id })
                                  .populate('user')
                                  .populate('customMenu');  // Populate these fields if needed
  
        res.status(200).json(events);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error retrieving your events', error: error.message });
    }
  
    // try {
    //     const { token } = req.cookies; 
    //     if (!token) {
    //         return res.status(401).send({ message: 'No token provided, user not authorized' });
    //     }
  
    //     // Decode the token to get the user ID
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     console.log("decoded id", decoded._id);
  
    //     // Assuming the user ID is stored in 'decoded.id' 
    //     // Fetch events where the 'user' field matches the logged-in user's ID
    //     const events = await Event.find({ user: decoded._id })
    //                               .populate('user')
    //                               .populate('customMenu');  // Populate these fields if needed
  
    //     res.status(200).json(events);
    // } catch (error) {
    //     console.error("Error:", error);
    //     res.status(500).json({ message: 'Error retrieving your events', error: error.message });
    // }
  });
  

  router.put('/:eventId', async (req, res) => {


    try {
      const { eventId } = req.params;
      const { customMenu, decor, eventDate, venue, name, contactNumber, email, guests, event_type, eventTime } = req.body;
        // Find the event by ID and update it
        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            // user: req.user._id, // user is fetched from the auth middleware
            customMenu, // Assuming customMenu is an array of menu item IDs or objects
            decor, // Decor ID or details
            name,
            contactNumber,
            email,
            venue,
            eventDate: new Date(eventDate),
            guests,
            event_type,
            eventTime
        }, { new: true }); // { new: true } ensures the updated document is returned

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error updating event', error: error.message });
    }
});
  
  router.get('/', protect, async (req, res) => {
    try {
      // Assuming customMenus is a reference. If it's an array of references adjust accordingly.
      const events = await Event.find({})
                                .populate('user' )
                                .populate('customMenu'); // Populate this if it's a reference
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving events', error: error.message });
    }
  });
  
  router.delete('/:id',protect, async function (req, res) {
    

    try {

const { id } = req.params;

// First, find the event to access the customMenu ID
const eventToDelete = await Event.findById(id);

if (!eventToDelete) {
    return res.status(404).send({ message: 'Event not found' });
}

// If there is a customMenu associated with the event, delete it
if (eventToDelete.customMenu) {
    await CustomMenu.findByIdAndDelete(eventToDelete.customMenu);
}

// Now delete the event itself
await Event.findByIdAndDelete(id);

return res.status(200).send({ message: 'Event and associated custom menu deleted successfully' });
  } catch (error) {
      console.log(error);
      return res.status(500). send({message:error.messsage})
  }
  })

  router.post('/check-availability', async function (req, res){
    const { newEventDate, selectedVenues, eventTimeselection } = req.body;
    console.log("newEventDate",newEventDate);
    console.log("selectedVenues",selectedVenues);
    console.log("eventTimeselection",eventTimeselection);
  try {
    const events = await Event.find({
      eventDate:newEventDate,
      venue: { $in: selectedVenues }, // Check for any of the venues being booked
      eventTime:eventTimeselection
    });
    const isAvailable = events.length === 0; // If no events found, venue is available
    res.json({ isAvailable });
  } catch (error) {
    res.status(500).send('Server Error');
  }
  })


  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("_id",id);
      const item = await Event.findById(id).populate('user' )
      .populate('customMenu');;
  
      return res.status(200).json(item);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

//   router.get('/myevents', protect, async (req, res) => {
//     try {
//       const { token } = req.cookies; 
//       let decoded;
//       if (token) {
//         // const decodedId = jwtDecode(token);
//         // console.log("decodedId",decodedId);
//          decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("decodedid", decoded.id);
//      }
//         // const userId = req.user._id;  // Get the user ID from the request

//         // Fetch events where the 'user' field matches the logged-in user's ID
//         const events = await Event.find({ user: decoded })
//                                   .populate('user')
//                                   .populate('customMenu');  // Populate these fields if needed

//         res.status(200).json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving your events', error: error.message });
//     }
// });


  
export default router;
