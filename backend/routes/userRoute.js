import express from 'express'
import {User} from '../models/models.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import bycrypt from 'bcryptjs'
import protect from '../middleWare/authMiddleWare.js';

// import {JWT_SECRET} from '../config.js'
// import {User} from '../models/models.js'
const router=express.Router()


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

router.post('/register', async (req, res) => {
    try {
        const {password,email,name}=req.body;
        if(!password || !email || !name) {
            return res.status(400).send({ message: 'please fill in all required fields' });
        }

        //validation
        if(password && password.length < 6){
            return res.status(400).send({ message: 'password must be atleast 6 characters' });
        }

        //check email with existing uers
        const userExists= await User.findOne({ email: email})

        if(userExists){
            return res.status(400).send({ message: 'user with the provided email is alresdy registered' });

        }

        //create a new user
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        };
        const user = await User.create(newUser);
        //generate token
            const token=generateToken(user._id)

        //generate HTTP-only cookie
        res.cookie('token', token,{
            path:'/',
            httpOnly:true,
            expires: new Date(Date.now() + 1000* 86400),
            sameSite:'none',
            secure:true
        })
            console.log(token);
        
        if(user){
            const {_id, name, email, photo, bio}=user;
            const registeredUser={
                _id,
                name, 
                email, 
                photo, 
                bio,
                token,
            }
            return res.status(201).send(registeredUser);
        }


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

router.post('/login',async (req,res)=>{
    try {
        const {password,email}=req.body;
        if(!password || !email) {
            return res.status(400).send({ message: 'please fill in all required fields' });
        }

        //check if user exists
        const user= await User.findOne({ email: email})

        if(!user){
            return res.status(400).send({ message: 'user not found please sign up' });

        } 

        //check for password
        const correctPassword = await bycrypt.compare(password, user.password);

        //generate token
        const token=generateToken(user._id)

        //generate HTTP-only cookie
        res.cookie('token', token,{
            path:'/',
            httpOnly:true,
            expires: new Date(Date.now() + 1000* 86400),
            sameSite:'none',
            secure:true
        })

        if (user && correctPassword) {
            const {_id, name, email, photo, bio}=user;
            const login={
                _id,
                name, 
                email, 
                photo, 
                bio,
                token
            }
            return res.status(200).send(login);
        }
        else{
            return res.status(400).send({ message: 'invalid email or password' });

        }
    }catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
})

router.get('/logout',async (req,res)=>{
    try {
        //generate HTTP-only cookie
        res.cookie('token', "",{
            path:'/',
            httpOnly:true,
            expires: new Date(0),
            sameSite:'none',
            secure:true
        })

        return res.status(200).send({ message: "user successfuly logged out" });


    }catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

router.get('/getuser',protect, async (req, res)=>{
    try {
        //will access the propertied from the user that i have fetched in the protect middleware
        // const user =await User.findById(req.user._id)
        // console.log(user);

        //will access the propertied from the user that i have fetched in the protect middleware
        const user=req.user;

        if(user){
            const {_id, name, email, photo, bio}=user;
            const registeredUser={
                _id,
                name, 
                email, 
                photo, 
                bio,
            }
            return res.status(201).send(registeredUser);
        }
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.patch('/updateuser',protect,async (req,res)=>{
    try {
        const user=req.user;
        console.log(user);
        const { _id,name, email, photo, bio}=user;

        if(user){
            user.email=email;
            user.name= req.body.name || name;
            user.photo= req.body.photo || photo;
            user.bio= req.body.bio || bio;
        }

        // Use findByIdAndUpdate to update the user by their ID
        const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

        if (updatedUser) {
            return res.status(200).send(updatedUser);
        } else {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.patch('/changepassword',protect, async (req, res) => {
    try {
        //will access the propertied from the user that i have fetched in the protect middleware
        const user =await User.findById(req.user._id)
        // const user=req.user;

        const {oldPassword, newPassword}=req.body;

        //validate
        if(!user){
            return res.status(400).send({ message: 'user not found, please signup' });
        }

        if(!oldPassword || !newPassword){
            return res.status(400).send({ message: 'please provide old and new password' });
        }
        
        //check if old password matches with the password in the database
        const passwordIsCorrect=await bycrypt.compare(oldPassword,user.password)

        //save new password
        if(user && passwordIsCorrect){
            user.password = newPassword;     
            await user.save();
            return res.status(200).send({message:"password changed successfuly"})
        }else{
            return res.status(400).send({message:"old password is incorrect"})
        }
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})

router.post('/forgotpassword',async(req, res)=>{
    res.send("Forgot your password")
})
// module.exports=router;
export default router;
