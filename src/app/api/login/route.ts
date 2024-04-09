import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();
    // TODO: add JWT_SECRET
    // const jwtSecretKey = process.env.JWT_SECRET;
    const jwtSecretKey = "2182312c81187ab82bbe053df6b7aa55";

    if (!email || !password) {
      return NextResponse.json("Failed: Login Incomplete", { status: 400 });
    }
    const user = await Users.findOne({ email: email }).orFail();
    // TODO: change passwords in Mongo to be encrypted versions
    const passwordsMatch = true; //bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      return NextResponse.json("Failed: Login Failed", { status: 400 });
    }

    // Login successful, create JSON web token
    const data = { signInTime: Date.now(), user };
    const token = jwt.sign(data, jwtSecretKey);
    console.log(data);
    console.log(token);
    return NextResponse.json({ message: "Success: Login Complete", token });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
