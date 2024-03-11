
import express from 'express'
import {Book} from '../models/models.js'

const router=express.Router()


    //post method
    router.post('/', async (req, res) => {
        try {
            if (
                !req.body.title ||
                !req.body.author ||
                !req.body.publishYear
            ) {
                res.status(400).send({ message: 'send all required fields: title, author, publishYear' });
            } else { // Corrected structure with 'else'
                const newBook = {
                    title: req.body.title,
                    author: req.body.author,
                    publishYear: req.body.publishYear
                };
                const book = await Book.create(newBook);
                return res.status(200).send(book);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
    //get all books from database
    router.get('/',async (req, res)=>{
        try {
            const books=await Book.find({})
            return res.status(200).json({
                count: books.length,
                data:books
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({message:error.message});
        }
    })
    
    //get single books from database
    router.get('/:id',async (req, res)=>{
        try {
    
            const {id}=req.params
            const book=await Book.findById(id)
            return res.status(200).json(book)
        } catch (error) {
            console.log(error);
            res.status(500).send({message:error.message});
        }
    })
    
    //update a book in the database
    router.put('/:id', async(req,res)=>{
        try {
            if(
                !req.body.title ||
                !req.body.author||
                !req.body.publishYear
            ){
                res.status(400).send({message:'send all required fields: title, author,publisherYear'})
            }
    
            const {id}=req.params;
    
            const result=await Book.findByIdAndUpdate(id,req.body);
    
            if(!result){
                return res.status(404).send({message:'book not found'})
            }
            return res.status(200).send({message:'book updated successfuly'})
    
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message:error.message})
        }
    })
    
    //delete book from database
    router.delete('/:id',async(req,res)=>{
        try {
            const {id}=req.params;
    const deleteBook= await Book.findByIdAndDelete(id)
    if(!deleteBook){
        return res.status(404).send({message:'book not found'})
    }
    return res.status(200).send({message:'book deleted successfuly'})
    
        } catch (error) {
            console.log(error);
            return res.status(500). send({message:error.messsage})
        }
    })
    // module.exports=router;

    export default router;