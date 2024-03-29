import express from 'express';
import {CustomMenu} from '../models/models.js'

const router=express.Router()


//post method
router.post('/', async (req, res) => {
    try {
        
        const newCustomMenu = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            items: req.body.items.map(item =>({
              item_type: item.item_type,
              options:item.options 
            })),
        };
        const menu = await CustomMenu.create(newCustomMenu);
        return res.status(200).send(menu);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})
export default router;
