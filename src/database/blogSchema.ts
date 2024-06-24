import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IEvent = {
  picture: string; // assumes URL
  alt: string;
  description: string;
  date: Date;
  name: string;
  blogID: string;
  author: string;
};

const blogSchema = new Schema<IEvent>({
  picture: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  blogID: { type: String, required: true },
  author: { type: String, required: true },
});

const Blog = mongoose.models["blogs"] || mongoose.model("blogs", blogSchema);

export default Blog;
