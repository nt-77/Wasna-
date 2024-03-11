import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from './routes/bookRoute.js'
import UserRoute from './routes/userRoute.js'
import MenuSchema from  './routes/menuRoute.js'
import decorInventoryRoute from './routes/decorInventoryRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'



const app=express();



//middleware for cors policy
//allow all origin with default of cors(*)
app.use(express.json());
//imahe processing
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors())
//for custom origins
// app.use(cors({
//     origin:'http://localhost:5000',
//     method:['GET','POST','DELETE','PUT'],
//     headers:['Content-Type']
// }))


app.use('/decor', decorInventoryRoute)
app.use('/api/user', UserRoute)
app.use('/books', bookRoute)
app.use('/menu',MenuSchema)


app.get('/',async(req,res)=>{
    // console.log(req);
    return res.status(234).send('welcome to Book Store')
    })
    

mongoose.connect(mongoDBURL).then(()=>{
    console.log('successfuly connected to database');
    app.listen(PORT, ()=>{
        console.log('app is listening on port 5000');
    })
}).catch((error)=>{
    console.log(error);
})
