import Category from "../models/category.js";
import slugify from "slugify";

export const create = async(req , res) =>{
    try{
        const {name} = req.body;

        if(!name.trim()){
            return res.json({error:"Name required"});
        }

        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.json({error:"Already exists"});
        }

        const category = await new Category({ name , slug: slugify(name) }).save();
        return res.json(category);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}; 

export const update = async (req , res) => {
    const {name}=req.body;
    try{
        const category = await Category.findByIdAndUpdate(req.params.categoryId , {
            name,
            slug:slugify(name),
        },
        {new:true}      // because it is a promise so if we want to get new updated name in res then we need to set new to true
      );

     return res.json(category);
    }
    catch (err){
            console.log(err);
            return res.status(400).json(err.message);
    }
};

export const remove = async (req , res) => {
    try{
        const removed  =await Category.findByIdAndDelete(req.params.categoryId);
        return res.json(removed);
    }
    catch (err){
            console.log(err);
            return res.status(400).json(err.message);
    }  
};

export const list = async (req , res) => {
    try{
        const all = await Category.find({});
       return  res.json(all); 
    }
    catch (err){
            console.log(err);
            return res.status(400).json(err.message);
    }
};

export const read = async (req , res) => {
    try{
        const category = await Category.findOne({ slug: req.params.slug });
        return res.json(category);
    }
    catch (err){
            console.log(err);
            return res.status(400).json(err.message);
    }
};