import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import UserSchema from "@database/userSchema";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const events = await UserSchema.find();
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json(`Events could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}

