import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String , 
        trim: true , // to remove the unnecessary whitespace 
        required:true,
    },
    email:{
        type: String , 
        trim: true , // to remove the unnecessary whitespace 
        required:true,
        unique: true,
    } ,
    password:{
        type:String , 
        required: true ,
        min: 6 , 
        max:64 ,
    },

    address:{
        type:String , 
        trim: true ,
    } ,
    role:{
        type:Number ,
        default: 0
    },

},
{ timestamps: true }
);

export default mongoose.model("User" , userSchema);