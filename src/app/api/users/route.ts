import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import UserSchema from "@database/userSchema";
import { getSession } from "services/auth/cookietoUsertype";

export async function GET(req: NextRequest) {
  await connectDB();

  // makes route exclusive to admin
  let usertype;
    usertype = await getSession(req);
  
    if (usertype != 'admin'){
      return NextResponse.json(`Forbidden Action`, {  status: 400,
      });
    }

  try {
    const url = new URL(req.url);
    const userType = url.searchParams.get("userType");

    console.log("userType = " + String(userType));
    if (!userType) {
      // default behavior: no userType specified, so get ALL users
      const users = await UserSchema.find();
      console.log("looking for ALL users");
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
