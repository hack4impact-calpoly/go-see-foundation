import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import eventSignUpSchema, { IEventSignUp } from "@database/eventSignUpSchema";
import Users from "@database/userSchema";

export async function POST(req: NextRequest) {
  await connectDB();
  console.log("HERE\N\N\N\N\N\N\N\N\N");

  try {
    const { email, needSightedGuide,attendedEventBefore, comments,  eventName } = await req.json();
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

    await newEventSignUp.save();
    console.log(newEventSignUp);

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
