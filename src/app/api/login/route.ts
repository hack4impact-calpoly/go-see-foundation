import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
const bcrypt = require("bcrypt"); 

export async function POST(req: NextRequest) {
    await connectDB();
    try{
        const {email, password} = await req.json()
        if (!email || !password) {
            return NextResponse.json("Failed: Login Incomplete", { status: 400 });
        }
        const user = await Users.findOne({email: email}).orFail();
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch){
            return NextResponse.json("Failed: Login Failed", {status: 400})
        }
        console.log(email)
        return NextResponse.json("Success: Login Complete");
    }
    catch (err) {
        return NextResponse.json(`${err}`, { status: 400 });
    }
}