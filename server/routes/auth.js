import express from "express";

const router = express.Router();

//middlewares
import {requireSignIn , isAdmin} from '../middlewares/auth.js';

//controllers
import { register , login , secret} from "../controllers/auth.js"

router.post('/register' , register);

router.post('/login' , login);

// testing
router.get('/secret' , requireSignIn , isAdmin , secret);                                                         // accessing the id of the user through JWT and hence can access other user details too

export default router;