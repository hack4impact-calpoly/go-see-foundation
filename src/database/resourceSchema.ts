import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IResource = {
    picture: string;
    alt: string;
    title: string;
    url: string;
};

const resourceSchema = new Schema<IResource>({
    picture: { type: String, required: true },
    alt: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
});

const Resource =
  mongoose.models["resources"] || mongoose.model("resources", resourceSchema);

export default Resource;