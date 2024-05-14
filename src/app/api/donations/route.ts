import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import DonationSchema from "@database/donationSchema";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
      const donations = await DonationSchema.find();
      console.log("fecthing all donations");
      return NextResponse.json(donations);
    } 
    
    catch (err) {
    return NextResponse.json(`Donations could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}
