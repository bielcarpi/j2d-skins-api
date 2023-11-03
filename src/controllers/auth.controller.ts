import {Request, Response} from 'express';
import {User} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// Helper function to generate JWT token
const generateToken = (id: string) => {
    let secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('Environment variable JWT_SECRET must be set.');
        process.exit(1);
    }

    const payload = {
        sub: id
    };
    return jwt.sign(payload, secret, {expiresIn: '24h'});
};


export const register = async (req: Request, res: Response) => {
    try {
        // Get user input
        const {username, password} = req.body;

        // Check if user already exists
        const oldUser = await User.findOne({username});

        if (oldUser) {
            // Return a 409 - Conflict (User already exists)
            return res.status(409).json({message: "User Already Exist. Please Login"});
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            password: encryptedPassword,
        });

        // Create token with user id
        const token = generateToken(user.id);

        // Return new user
        res.status(201).json({token: token});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error in Saving"});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // Get user input
        const {username, password} = req.body;

        // Validate if user exist in our database
        const user = await User.findOne({username});

        // If user exist, compare passwords
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token to send back for authentication
            const token = generateToken(user.id);

            return res.status(200).json({token: token,});
        }

        //If password is incorrect
        res.status(400).json({message: "Invalid Credentials"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error in Saving"});
    }
};