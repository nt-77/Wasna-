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

    export default router;
