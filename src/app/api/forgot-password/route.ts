import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@database/userSchema";
import ResetTokens from "@database/resetTokenSchema";
import emailjs from "@emailjs/browser";
const crypto = require('crypto');
const { createHash } = require('crypto');

export async function POST(req: NextRequest) {
    await connectDB();
    try{
        const {email} = await req.json();
        if (!email){
            return NextResponse.json("Failed: Email Required", { status: 400 });
        }

        try {
            await Users.findOne({ email: email }).orFail();
        } catch (error) {
            return NextResponse.json("Failed: Email Not Found", { status: 404 });
        }
        // ResetTokens.collection.dropIndex('email_1');
        
        const token = crypto.randomBytes(64).toString('hex');
        const hashed_token = createHash('sha256').update(token).digest('hex');

        const currentDate = new Date();
        const expiration_date = new Date(currentDate.setDate(currentDate.getDate() + 30));
        const newResetToken = new ResetTokens({
            email: email,
            token: hashed_token,
            expirationDate: expiration_date
        })

        await newResetToken.save();
        return NextResponse.json({
            message: 'Success: Reset Token Created',
            token: token
        });

    }
    catch(err){
        return NextResponse.json(`${err}`, { status: 400 });
    }
}