import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IEvent = {
  picture: String; // assumes URL
  alt: String;
  description: String;
  date: Date;
  name: String;
  eventID: String;
};

const eventSchema = new Schema<IEvent>({
  picture: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  eventID: { type: String, required: true },
});

const Event =
  mongoose.models["events"] || mongoose.model("events", eventSchema);

export default Event;
