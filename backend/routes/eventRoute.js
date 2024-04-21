import express from 'express'
import {Event} from '../models/models.js'
import {User} from '../models/models.js'
import { CustomMenu } from '../models/models.js';

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
    const {  customMenu, decor } = req.body;
    console.log("customMenu",customMenu);
  
    try {
      // Create a new event with the provided details
      const event = new Event({
        user: user._id,
        customMenu: customMenu, // This is an array of custom menu objects
        decor: decor, // This is the ID of the chosen decor
        // venue
      });
  
      // Save the event to the database
      await event.save();
  
      res.status(201).send(event);
    } catch (error) {
      res.status(400).json({ message: 'Error creating event', error: error.message });
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
  
  
export default router;
