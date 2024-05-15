import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IEventSignUp = {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  phoneNum: string;
  needSightedGuide: boolean;
  attendedEventBefore: boolean;
  comments: string;
  eventName: string;

};

const eventSignUpSchema = new Schema<IEventSignUp>({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, required: true },
    phoneNum: { type: String, required: true },
    needSightedGuide: { type: Boolean, required: true },
    attendedEventBefore: { type: Boolean, required: true },
    comments: { type: String, required: true },
    eventName: { type: String, required: true },
});

const EventSignUp =
  mongoose.models["eventSignUp"] || mongoose.model("eventSignUp", eventSignUpSchema);

export default EventSignUp;