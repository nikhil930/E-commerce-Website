import mongoose, { Mongoose } from "mongoose";
const {ObjectId} = new mongoose.Schem;

const productSchema = new Mongoose.Schema({
    name: {
        type:String , 
        trim:true ,
        required: true ,
        maxlength: 160,
    },
    slug: {
        tpe: String ,
        lowercase: true,
    },
    description:{
        type:String ,
        requires: true, 
        maxlength:2000,
    },
    price: {
        type:Number ,
        trim: true ,
        required:true,
    },
    category: {
        type: ObjectId ,
        ref:"Category" ,
        required: true,
    },
    quantity:{
        type:Number,
    },
    sold:{
        type:Number , 
        default:0,
    },
    photo: {
       data: buffer ,
       contentType: String,  
    },
    shipping:{
        required:false ,
        type:Boolean,
    },
},
{
    timestamp:true
});
export default mongoose.model('Product' , productSchema);