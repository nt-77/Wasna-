import express from 'express'
import {User} from '../models/models.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config';
// import jwtDecode from 'jwt-decode';
import bycrypt from 'bcryptjs'
import protect from '../middleWare/authMiddleWare.js';
import nodemailer from'nodemailer';
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
            return res.status(402).send({ message: 'user with the provided email is alresdy registered' });

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
            // path:'/',
            httpOnly:true,
            // expires: new Date(Date.now() + 1000* 86400),
            // sameSite:'none',
            // secure:true
        })
            console.log(token);
        
        if(user){
            const {_id, name, email, bio}=user;
            const registeredUser={
                _id,
                name, 
                email, 
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
        if (!correctPassword) {
            // If password is incorrect, do not generate token or set cookie
            return res.status(400).send({ message: 'Invalid email or password.' });
        }
        // if(correctPassword && user){       
             const token=generateToken(user._id)

            //generate HTTP-only cookie
            res.cookie('token', token,{
                // path:'/',
                httpOnly:true,
                // expires: new Date(Date.now() + 1000* 86400),
                // sameSite:'none',
                secure:false
            })
        // }
        //generate token


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
            return res.status(400).send({ message: 'Invalid email or password' });

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
            // path:'/',
            httpOnly:true,
            expires: new Date(0),
            // sameSite:'none',
            secure:false
        })

        return res.status(200).send({ message: "user successfuly logged out" });


    }catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

//to check user login
router.get('/',protect, async (req, res)=>{
try{
    const user=req.user;
    return res.status(200).send(user)
}catch(error) {
    return res.status(400).send({message:error.message})
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
            const {_id, name, email, bio}=user;
            const registeredUser={
                _id,
                name, 
                email, 
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
        const { _id,name, email, bio}=user;

        if(user){
            user.email=email;
            user.name= req.body.name || name;
            // user.photo= req.body.photo || photo;
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

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a65f8683cfbf43",
      pass: "74a829aa646bb2"
    }
  });


router.post('/forgotpassword',async(req, res)=>{
    try {
        const { email } = req.body;

        // Check if user with provided email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User with the provided email could not be found" });
        }

        const token=generateToken(user._id)

        console.log("Generated token:", token); // Log the generated token
        // const expirationTime = 3600000; // 1 hour in milliseconds
        const expires = Date.now() + 24*60*60*1000;

        user.resetPasswordToken = token;
        user.resetPasswordTokenExpires =expires;
        await user.save();

        console.log("User saved:", user); // Log the saved user

        // Compose email message
        const mailOptions = {
            from: "Your Name <your-email@example.com>",
            to: email,
            subject: "Password Reset Instructions",
            // text: `To reset your password, click on the following link:/resetpassword?token=${token}`,
            html: `To reset your password, click on the following link: <a href="${process.env.DOMAIN}/resetpassword?token=${token}">${process.env.DOMAIN}/resetpassword?token=${token}</a>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Password reset instructions sent"); // Log password reset instructions sent

        // Return success response
        return res.json({ message: "Password reset instructions sent to your email." });
    } catch (error) {
        console.error("Forgot password failed", error.message);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/resetpassword', async (req, res) => {

    try {
        const { token, newPassword } = req.body;
        console.log(newPassword);
        if(newPassword.length < 6){
            return res.status(400).send({ message: 'password must be atleast 6 characters' });
        }

        console.log(token);
        console.log(newPassword);
        const expires = Date.now() + 24*60*60*1000;
        // Validate token and find user. This part depends on how you've implemented token generation and storage.
        // For the sake of this example, let's assume the token is stored in the user document and you have a method to validate it.
        const user = await User.findOne({
            resetPasswordToken: token
            // resetPasswordTokenExpires: expires
        });
        console.log("user",user);

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired password reset token." });
        }

        // Update user's password and clear the reset token
        user.password = newPassword;
                //generate HTTP-only cookie
                res.cookie('token', user.resetPasswordToken,{
                    // path:'/',
                    httpOnly:true,
                    // expires: new Date(Date.now() + 1000* 86400),
                    // sameSite:'none',
                    secure:false
                })
        user.resetPasswordToken = null; // Or null, to clear the token
        user.resetPasswordTokenExpires = null; // Or null, to clear the token
                
        await user.save();
        console.log(user);

        // Respond to the request
        res.json({user,message: "Password has been reset successfully." });
    } catch (error) {
        console.error("Password reset failed", error.message);
        res.status(500).json({ message: error.message });
    }
});

//check login
router.get('/autheriseUSer',protect, (req, res) => {
    const { token } = req.cookies; 
    console.log("working");
    if (token) {
        // const decodedId = jwtDecode(token);
        // console.log("decodedId",decodedId);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded.id);
        return res.status(200).send(decoded);
        //   res.json({ valid: true, data: decoded });
 
     } else {
      res.status(401).send({ message: 'Unauthorized: No token provided' });
    }
  });

  router.get("/getAll", async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({
        count: User.length,
        data: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
const deleteBook= await User.findByIdAndDelete(id)
if(!deleteBook){
    return res.status(404).send({message:'User not found'})
}
return res.status(200).send({message:'User deleted successfuly'})

    } catch (error) {
        console.log(error);
        return res.status(500). send({message:error.messsage})
    }
})
// module.exports=router;
export default router;
