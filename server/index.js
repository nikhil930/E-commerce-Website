
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from "morgan";
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js";
import cors from 'cors';    

dotenv.config();

const app = express();

//database
mongoose.connect(process.env.MONGO_URI).then(() =>
    console.log("DB connected")
)
.catch((err) => console.log("DB Error =>" , err));

// MIDDLEWARE
app.use(cors());        // This middleware is used because our server is running on port 8000
                        // while our react application is running on port 3000 so we cannot access 
                        //differennt domain server from our frontend(React) , so cors is used for
                        //cross-origin-resource access
 app.use(morgan("dev"));
 app.use(express.json());   // to handle the json data so that controller can access it

// app.use((req , res , next) =>{
//     console.log("This is middleware running");
//     next();
// });

// app.get("/users"  , function(req , res){
//     res.json({
//         data:"Ryan Zen David"
//     });
// });



// router middleware

app.use("/api",authRoutes);
app.use("/api",categoryRoutes);
app.use("/api" , productRoutes);

const port=process.env.PORT || 8000;

app.listen(port , () =>{
    console.log(`Node server is now running on port ${port}`);
});
 