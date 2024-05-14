import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import eventSignUpSchema, { IEventSignUp } from "@database/eventSignUpSchema";
import Users from "@database/userSchema";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const data = await req.json()
    const email = data.email
    const needSightedGuide = data.needSightedGuide
    const attendedEventBefore = data.attendedEventBefore
    const comments = data.comments
    const eventName = data.eventName

    const user = await Users.findOne({ email}).orFail();

    try{

    
    const newEventSignUp = new eventSignUpSchema({
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        phoneNum: user.phoneNum,
        email: user.email,
        needSightedGuide: needSightedGuide,
        attendedEventBefore: attendedEventBefore,
        comments: comments,
        eventName: eventName
    });

    console.log(newEventSignUp);
    await newEventSignUp.save();
    return NextResponse.json({
      message: "Success: EventSignUp uploaded",
      status: 200,
    });

    } catch (err) {
        return NextResponse.json(`${err}`, { status: 400 });
    }

  } catch {
    console.log("Error fetching data for email")
  }

}
