import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignIn = (req , res , next) => { 
    // console.log('REQ HEADERS' , req.headers);

    try{
        const decoded = jwt.verify(
            req.headers.authorization , // ye wo token hai jo humne header me include kiya hai
            process.env.JWT_SECRET      // ye wo secret hai jisse wo jwt token bana tha
            );
            // console.log("decoded =>" , decoded);

            req.user = decoded;
            next();
    }
    catch(err){
        return res.status(401).json(err);
    }
    
};

export const isAdmin = async (req , res , next) =>{ // middle to find the type of middleware based on his role ,
    try{                                            // that we can find using the users data we fetched from the above 
                                                    // middleware.
        const user  = await User.findById(req.user._id);
        //role=1 matlab admin  ,else user.
        if( user.role !== 1 ){
            return res.status(401).send("Unauthorized");
        }
        else{
            next();
        }
        next();
    }
    catch(err){
        console.log(err);
    }
};