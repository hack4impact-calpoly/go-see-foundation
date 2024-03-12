import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
const bcrypt = require("bcrypt"); 

export async function GET(req: NextRequest) {
    await connectDB();
    try{
        const {email, plain_text_password} = await req.json();
        if (!email || !plain_text_password) {
            return NextResponse.json("Failed: Login Incomplete", { status: 400 });
        }
        const user = await Users.findOne({email: email}).orFail();
        const passwordsMatch = bcrypt.compareSync(plain_text_password, user.password);
        if (!passwordsMatch){
            return NextResponse.json("Failed: Login Failed")
        }
        return NextResponse.json(email);
    }
    catch (err) {
        return NextResponse.json(`${err}`, { status: 400 });
    }
}