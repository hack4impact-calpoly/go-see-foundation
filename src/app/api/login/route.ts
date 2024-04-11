import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not defined.');
      // jwt secrets is not defined
      const errorMessage = "An error occurred. Please try again later."; // Custom error message
      return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
  
    const jwtSecretKey = process.env.JWT_SECRET;

    if (!email || !password) {
      return NextResponse.json("Failed: Login Incomplete", { status: 400 });
    }
    const user = await Users.findOne({ email: email }).orFail();
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      return NextResponse.json("Failed: Login Failed", { status: 400 });
    }

    // Login successful, create JSON web token, add expiration time and sign in time
    const curr_time = new Date().getTime(); // get the current time in millisec
    const curr_time_sec = Math.round(curr_time / 1000); // current time in seconds
    const exp_time_sec = curr_time_sec + 1800; // exp time sec (current time + 30 mins)
    const data = { signInTime: curr_time_sec, exp: exp_time_sec, user };
    const token = jwt.sign(data, jwtSecretKey);
    return NextResponse.json({ message: "Success: Login Complete", token });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
