import express from "express";

const router = express.Router();

//middlewares
import {requireSignIn , isAdmin} from '../middlewares/auth.js';

//controllers
import { register , login , secret} from "../controllers/auth.js"

router.post('/register' , register);

router.post('/login' , login);

router.get('/auth-check' , requireSignIn , (req , res) =>{
    res.json({ok:true});
    // console.log("Checked");
});             // this we are doing to get a server response when we are trying to access private routes(in the client side);

// testing
router.get('/secret' , requireSignIn , isAdmin , secret);                                                         // accessing the id of the user through JWT and hence can access other user details too

export default router;