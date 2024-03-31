import express from 'express'
import {Event} from '../models/models.js'

import protect from '../middleWare/authMiddleWare.js';

// import {JWT_SECRET} from '../config.js'
// import {User} from '../models/models.js'
const router=express.Router()


// Route to create a new event
router.post('/',protect, async (req, res) => {
    const user=req.user;
    console.log(user);

    console.log(req.body);
    const {  customMenus, decor,venue } = req.body;
  
    try {
      // Create a new event with the provided details
      const event = new Event({
        user: user._id,
        customMenus: customMenus, // This is an array of custom menu objects
        decor: decor, // This is the ID of the chosen decor
        venue
      });
  
      // Save the event to the database
      await event.save();
  
      res.status(201).send(event);
    } catch (error) {
      res.status(400).json({ message: 'Error creating event', error: error.message });
    }
  });
  
export default router;
