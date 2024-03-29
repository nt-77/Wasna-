import express from 'express';
import { User } from '../models/models.js';
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const token = req.cookies.token;
        console.log(token); 
        // Check if the user has a token (is logged in or not)
        if (!token) {
            return res.status(401).send({ message: 'User not authorized, please login' });
        }

        // Verify the token (check if it's expired or not)
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token (the user ID from which the token was created)
        // Want to get all user properties except the user password
        const user = await User.findById(verified.id).select('-password');

        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }

        // console.log(user);
        // Make the fetched user object available in the requested user
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).send({ message: 'Not authorized, please login' });
    }
};

export default protect;
