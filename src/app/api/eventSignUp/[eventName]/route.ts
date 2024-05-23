import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import eventSignUpSchema,  { IEventSignUp } from "@database/eventSignUpSchema";
import Users from "@database/userSchema";
import EventSignUp from "@database/eventSignUpSchema";

type IParams = {
    params: {
      eventName: string;
    };
  };

export async function GET(req: NextRequest, { params }: IParams) {
    await connectDB();
    const { eventName } = params

    try {
        const attenders = await EventSignUp.find({eventName: eventName}).orFail();
        return NextResponse.json(attenders);
    } catch {
      console.log("Error fetching data for Event")
      return NextResponse.json({
          message: "No Existing Event!",
          status: 400,
        });
    }
  }