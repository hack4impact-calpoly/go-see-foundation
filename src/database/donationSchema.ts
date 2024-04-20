import mongoose from "mongoose";
import { Schema, model } from "mongoose";

export type IDonation = {
  amount: string; 
  email: string;
  date: Date;
};

const donationSchema = new Schema<IDonation>({
    amount: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
});

const Donation =
  mongoose.models["donations"] || mongoose.model("donations", donationSchema);

export default Donation;