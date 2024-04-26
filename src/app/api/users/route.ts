import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import UserSchema from "@database/userSchema";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const userType = url.searchParams.get("userType");

    console.log("userType = " + String(userType));
    if (!userType) {
      // default behavior: no userType specified, so get ALL users
      const users = await UserSchema.find();
      console.log("looking for ALL users");
      console.log(users);
      alert("Hello 1")
      return NextResponse.json(users);
    } else {
      // specified userType found, only get those users
      const users = await UserSchema.find({ userType });
      return NextResponse.json(users);
    }
  } catch (err) {
    return NextResponse.json(`Events could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}
