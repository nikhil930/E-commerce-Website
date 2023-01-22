import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares

import { requireSignIn, isAdmin } from "../middlewares/auth.js";
// because category can only be created by admins

import {
  create,
  list,
  read,
  photo,
  remove,
  update,
} from "../controllers/product.js";

router.post("/product", requireSignIn, isAdmin, formidable(), create); // formidabble ki wajah se req.fields and req.files kar paaye hain
router.delete("/product/:productId", requireSignIn, isAdmin, remove);
router.get("/product/photo/:productId", photo);
router.get("/products", list);
router.get("/product/:slug", read);
router.put("/product/:productId", requireSignIn, isAdmin, formidable() ,update);

export default router;
