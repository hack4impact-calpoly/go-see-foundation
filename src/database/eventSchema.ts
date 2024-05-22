import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IEvent = {
  picture: string; 
  alt: string;
  description: String;
  date: Date;
  name: String;
  eventID: String;
  location: String;
  startTime: String;
  endTime: String;
};

const eventSchema = new Schema<IEvent>({
  picture: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  eventID: { type: String, required: true },
  location: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const Event =
  mongoose.models["events"] || mongoose.model("events", eventSchema);

export default Event;
