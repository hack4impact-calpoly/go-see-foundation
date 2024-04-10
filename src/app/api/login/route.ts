import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();
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
    const exp_time = new Date().getTime();
    const exp_time_sec = Math.round(exp_time / 1000);
    const data = { signInTime: Date.now(), exp: exp_time_sec, user };
    const token = jwt.sign(data, jwtSecretKey);
    return NextResponse.json({ message: "Success: Login Complete", token });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
