import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

export const create = async (req, res) => {
  // now since we have applied formidable middleware to hume form data recieve ho rha hai , in form of txt and files(for images)
  try {
    // console.log(req.fields);  // for text wala
    // console.log(req.files);  //  for images

    const { name, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        return res.json({ error: "name is required" });
      case !description.trim():
        return res.json({ error: "description is required" });
      case !price.trim():
        return res.json({ error: "price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !quantity.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "photo should be less than 1 mb in size" });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// to make response faster we will not fetch the images
export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category") // this populate is used to show the names of the categories and not the categoryid , this could be done because we passed ref:"category" in the product modal in category field
      .select("-photo") /// everything except photo field
      .limit(15)
      .sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    return res.json(product);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
  }
};
export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo"); // Hmne photo issliye deselect ki because hume response me deleted object ko return karna hai
  } catch (err) {
    // aur photo res ko late karwa dega
    console.log(err);
  }
};

export const update = async (req, res) => {
  // now since we have applied formidable middleware to hume form data recieve ho rha hai , in form of txt and files(for images)
  try {
    // console.log(req.fields);  // for text wala
    // console.log(req.files);  //  for images

    const { name, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        return res.json({ error: "name is required" });
      case !description.trim():
        return res.json({ error: "description is required" });
      case !price.trim():
        return res.json({ error: "price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !quantity.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "photo should be less than 1 mb in size" });
    }

    const product = await Product.findById(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// since we have to upload the file or the photo of the product so we have to take
