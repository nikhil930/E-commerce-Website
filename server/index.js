
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from "morgan";
import categoryRoutes from "./routes/category.js"

dotenv.config();

const app = express();

//database
mongoose.connect(process.env.MONGO_URI).then(() =>
    console.log("DB connected")
)
.catch((err) => console.log("DB Error =>" , err));

// MIDDLEWARE

 app.use(morgan("dev"));
 app.use(express.json());

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

const port=process.env.PORT || 8000;

app.listen(port , () =>{
    console.log(`Node server is now running on port ${port}`);
});
 