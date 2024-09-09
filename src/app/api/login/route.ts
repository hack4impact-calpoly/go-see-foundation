import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
import { cookies } from 'next/headers'
import type {NextApiRequest, NextApiResponse} from 'next'
const bcrypt = require("bcryptjs");
const jose = require('jose')

// library for generating symmetric key for jwt
const { createSecretKey } = require('crypto');

export async function POST(req: NextRequest, res: NextApiResponse<{ message: string }>) {

  console.log("in login api route")
  await connectDB();
  try {
    const { email, password } = await req.json();
    let errorMessage = null;
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not defined.');
      // jwt secrets is not defined
      errorMessage = "An error occurred. Please try again later."; // Custom error message
      return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
  
    const jwtSecretKey = process.env.JWT_SECRET;

    if (!email || !password) {
      errorMessage = "Failed: Login Incomplete";
      return NextResponse.json({ message: errorMessage}, { status: 400 });
    }
    const user = await Users.findOne({ email: email }).orFail();
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      errorMessage = "Failed: Login Failed";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    // Login successful, create JSON web token, add expiration time and sign in time
    const curr_time = new Date().getTime(); // get the current time in millisec
    const curr_time_sec = Math.round(curr_time / 1000); // current time in seconds
    const exp_time_sec = curr_time_sec + 1800; // exp time sec (current time + 30 mins)
    const data = { signInTime: curr_time_sec, exp: exp_time_sec, user };

    const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');
    let token;
    try {
      token = await new jose.SignJWT({ payload: data }) // details to  encode in the token
      .setProtectedHeader({ alg: 'HS256' }) // algorithm
      .setIssuedAt()
      //.setIssuer(process.env.JWT_ISSUER) // issuer
      //.setAudience(process.env.JWT_AUDIENCE) // audience
      .setExpirationTime('2h') // token expiration time, e.g., "1 day"
      .sign(secretKey); // secretKey generated from previous step
      console.log("token: ", token);
    }
    catch(err){
      console.log("error", err);
    }

    console.log("worked")
    
    cookies().set('Auth_Session', token, {
      sameSite: 'strict',
      httpOnly: true,
      // secure: true, # Uncomment this line when using HTTPS
    });

    console.log("type:", user.userType);

    if(user.userType == 'admin'){
      return NextResponse.json({ message: "Admin Success: Login Complete" });
    }

    //return NextResponse.redirect(new URL('/', req.nextUrl))
    return NextResponse.json({ message: "Success: Login Complete" });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}