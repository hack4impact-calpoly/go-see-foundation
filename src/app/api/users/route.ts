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

export async function getUsersByType(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const userType = url.searchParams.get("userType");

    if (!userType) {
      return NextResponse.json("User type parameter is required", {
        status: 400,
      });
    }

    const users = await UserSchema.find({ userType });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(`Users could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}
