import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, {IUser} from "@database/userSchema"

export async function POST(req: NextRequest) {
    await connectDB();
    try{
        const { username, password, userType, firstName, lastName, phoneNum, email}: IUser = await req.json()
        if (!username || !password || !userType || !firstName || !lastName || !phoneNum || !email) {
            return NextResponse.json("Failed: Invalid User", { status: 400 });
        }
        const bcrypt = require('bcrypt');
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await Users.create({ username, hashedPassword, userType, firstName, lastName, phoneNum, email });
        return NextResponse.json("Success: Registration Complete", { status: 200 });
    }
    catch{
        return NextResponse.json("Failed: User Not Added", { status: 400 });
    }
}