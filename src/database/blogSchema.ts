import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IBlog = {
  picture: string; // assumes URL
  alt: string;
  description: String;
  date: Date;
  name: string;
  blogID: string;
  author: string;
};

const blogSchema = new Schema<IBlog>({
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
