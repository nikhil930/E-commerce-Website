import express from "express";

const router = express.Router();

//middlewares

import {requireSignIn , isAdmin} from "../middlewares/auth.js";
// because category can only be created by admins

import { create , update , remove , list , read} from "../controllers/category.js";

router.post("/category" , requireSignIn , isAdmin , create);
router.put("/category/:categoryId" , requireSignIn , isAdmin , update);
router.delete("/category/:categoryId" ,requireSignIn , isAdmin , remove);
router.get("/categories" ,list);
router.get("/category/:slug" , read);


export default router;