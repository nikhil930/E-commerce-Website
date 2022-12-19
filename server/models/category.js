import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true },
  slug: { type: String, unique: true, lowercase: true }, // URl addition when opeining a category
});

export default mongoose.model("Category", categorySchema);
