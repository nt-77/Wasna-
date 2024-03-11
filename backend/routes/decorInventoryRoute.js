import express from 'express'
import {Decor} from '../models/models.js'
// import jwt from 'jsonwebtoken'
// import 'dotenv/config';
// import bycrypt from 'bcryptjs'
import protect from '../middleWare/authMiddleWare.js';

const router=express.Router()

import multer from 'multer';

// Multer setup for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//need to add protect in here
router.post('/adddecoritem', upload.single('image'), async (req, res) => {
  try {
    if (!req.body.name || !req.body.item_type || !req.body.quantity || !req.file) {
      res.status(400).send({ message: 'send all required fields: name, item type, quantity, image' });
    } else {
      // Save decor item with embedded image details
      const newItem = {
        name: req.body.name,
        item_type: req.body.item_type,
        quantity: req.body.quantity,
        image: {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
          data: req.file.buffer.toString('base64'),
        },
      };

      const decor = await Decor.create(newItem);
      return res.status(200).send(decor);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

    //delete decor from database
    router.delete('/:id',async(req,res)=>{
      try {
          const {id}=req.params;
  const deleteItem= await Decor.findByIdAndDelete(id)
  if(!deleteItem){
      return res.status(404).send({message:'decor item not found'})
  }
  return res.status(200).send({message:'decor item deleted successfuly'})
  
      } catch (error) {
          console.log(error);
          return res.status(500). send({message:error.messsage})
      }
  })

    //update a decor in the database
router.put('/:id', async(req,res)=>{
   try {
    const {id}=req.params;
    const item= await Decor.findById(id)
    const {_id,name, item_type, quantity, image}=item;

    if(item){
      item.name= req.body.name || name;
      item.item_type= req.body.item_type || item_type;
      item.quantity= req.body.quantity || quantity;
      item.image= req.body.image || image;
  }
          const result=await Decor.findByIdAndUpdate(id,item);  
          if(!result){
              return res.status(404).send({message:'Item not found'})
          }
          return res.status(200).send({message:'Item updated successfuly'})
  
          
      } catch (error) {
          console.log(error);
          res.status(500).send({message:error.message})
      }
  })
// router.post('/adddecoritem',protect,async(req,res)=>{
//     try {
//         if (
//             !req.body.name ||
//             !req.body.item_type ||
//             !req.body.quantity ||
//             !req.body.image
//         ) {
//             res.status(400).send({ message: 'send all required fields: name, item type, quantity, image' });
//         } else { // Corrected structure with 'else'
//             const newItem = {
//                 name: req.body.name,
//                 item_type: req.body.item_type,
//                 quantity: req.body.quantity
//             };
//             const decor = await Decor.create(newItem);
//             return res.status(200).send(decor);
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message:error.message});
//     }

// })
router.get('/getall', async(req,res)=>{
    try {            
    const decor_items=await Decor.find({})
    return res.status(200).json({
        count: Decor.length,
        data:decor_items
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
})

    //get single decor item from database
    router.get('/:id',async (req, res)=>{
      try {
  
          const {id}=req.params
          const item=await Decor.findById(id)
          return res.status(200).json(item)
      } catch (error) {
          console.log(error);
          res.status(500).send({message:error.message});
      }
  })

export default router;
