import User from "../models/user.js"
import {hashPassword , comparePassword} from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
/**
 * add validation
 * check if email is already taken
 * hash password
 */

dotenv.config();
export const register = async (req , res) =>{
    try{

        // destructure name , email , password for validation
        // check all feilds require validation
        // check id email is taken
        // hash the password
        // register user
        // send response

        const {name, email , password} = req.body;

        if(!name.trim()){
            return res.json({error:"Name is required"});
        }

        if(!email){
            return res.json({error:"Email is required"});
        }

        if(!password || password.length < 6){
            return res.json({error:"Password must be 6 characters long"});
        }

        const existingUser = await User.findOne({email: email});  // also can write just email , if both paramenters are same

        if(existingUser){
            return res.json({error:"Email already taken"});
        }

        const hashedPassword = await hashPassword(password);

        const user = await new User({name , email , password:hashedPassword});
        user.save();

        //create signed jwt

        const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET ,{      // helps in verifying when we are accesing routes that are only
            expiresIn:"7d",                                                     // meant to be used bt authenticated user , so then token is used
        });                                                                     // to verify if the user is authenticated one or not.

        res.json({user: {
        name:user.name , 
        email:user.email ,
        role:user.role , 
        address: user.address, 
        } , 
        token});
    }
    catch(err){
        console.log(err);
    }
}

export const login = async (req , res) =>{
    try{

        // destructure name , email , password for validation
        // check all feilds require validation
        // check id email is taken
        // hash the password
        // register user
        // send response

        const {email , password} = req.body;

        if(!email){
            return res.json({error:"Email is required"});
        }

        if(!password || password.length < 6){
            return res.json({error:"Password must be 6 characters long"});
        }

        const user = await User.findOne({email: email});  // also can write just email , if both paramenters are same

        if(!user){
            return res.json({error:"No user found"});
        }

        //compare password
        const match = await comparePassword(password , user.password);

        if(!match){
            return res.json({error:"Wrong Password"});
        }
        // const user = await new User({name , email , password:hashedPassword});
        // user.save();

        //create signed jwt

        const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET ,{      // helps in verifying when we are accesing routes that are only
            expiresIn:"7days",                                                     // meant to be used bt authenticated user , so then token is used
        });                                                                     // to verify if the user is authenticated one or not.

        return res.json({user: {
        name:user.name , 
        email:user.email ,
        role:user.role , 
        address: user.address, 
        } , 
        token});
    }
    catch(err){
        console.log(err);
    }
}

export const secret = async (req , res) =>{       // issme since we are using a middleware therefore we are able to get the information
    return res.json({ currentUser: req.user});                     // of the currently logged in user in this route because in the middleware we are   
}