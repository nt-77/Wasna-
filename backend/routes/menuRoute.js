import express from 'express'
import {Menu} from '../models/models.js'

const router=express.Router()


    //post method
    router.post('/', async (req, res) => {
        try {
            // if (
            //     !req.body.title ||
            //     !req.body.author ||
            //     !req.body.publishYear
            // ) {
            //     res.status(400).send({ message: 'send all required fields: title, author, publishYear' });
            // } else { // Corrected structure with 'else'
   // Check if required fields are present
    if (!req.body.title || !req.body.category || !req.body.description || !req.body.price || !req.body.items) {
      res.status(400).send({ message: 'Send all required fields: title, category, description, price, items' });
    } else {
      const newItems = req.body.items.map(item => {
        return {
          item_type: item.item_type,
          options: [
            "biryani",
          ],
        };
      });

      const newBook = {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        items: req.body.items.map(item =>({
          item_type: item.item_type,
          options:item.options ||{}
        })),
      };

      const book = await Menu.create(newBook);
      return res.status(200).send(book);
    }

            } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });

        //get all menus from database
        router.get('/',async (req, res)=>{
          try {
              const menus=await Menu.find({})
              return res.status(200).json({
                  count: menus.length,
                  data:menus
              })
          } catch (error) {
              console.log(error);
              res.status(500).send({message:error.message});
          }
      })
 // Update a menu in the db
// Update a menu in the db
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Menu.findById(id);

    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }

    item.title = req.body.title || item.title;
    item.category = req.body.category || item.category;
    item.description = req.body.description || item.description;
    item.price = req.body.price || item.price;

    // Iterate through the items array in the request body and update each item in the database
    if (req.body.items && req.body.items.length > 0) {
      req.body.items.forEach((newItem) => {
        const existingItem = item.items.find((i) => i.item_type === newItem.item_type);
        if (existingItem) {
          existingItem.options = newItem.options;
        } else {
          item.items.push(newItem);
        }
      });
    }

    const result = await item.save();
    return res.status(200).send({ message: 'Item updated successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

    //delete menu from database
    router.delete('/:id',async(req,res)=>{
      try {
          const {id}=req.params;
  const deleteBook= await Menu.findByIdAndDelete(id)
  if(!deleteBook){
      return res.status(404).send({message:'Menu not found'})
  }
  return res.status(200).send({message:'menu deleted successfuly'})
  
      } catch (error) {
          console.log(error);
          return res.status(500). send({message:error.messsage})
      }
  })

    export default router;
