import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
const bcrypt = require("bcrypt"); 

export async function POST(req: NextRequest) {
    await connectDB();
    try{
        const {email, new_password} = await req.json();
        if (!email){
            return NextResponse.json("Failed: Email Required", { status: 400 });
        }

        let user;
        try {
            user = await Users.findOne({ email: email }).orFail();
        } catch (error) {
            return NextResponse.json("Failed: Email Not Found", { status: 404 });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed_password = await bcrypt.hash(new_password, salt);
        user.password = hashed_password;
        await user.save();
        return NextResponse.json("Success: Password Updated");
    }
    catch(err){
        return NextResponse.json(`${err}`, { status: 400 });
    }
}