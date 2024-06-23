import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import eventSignUpSchema,  { IEventSignUp } from "@database/eventSignUpSchema";
import Users from "@database/userSchema";
import EventSignUp from "@database/eventSignUpSchema";


export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, needSightedGuide,attendedEventBefore, comments,  eventName } = await req.json();
    const signedUp = await Users.findOne({ email}, {eventName});

    if(signedUp !== null){
      return NextResponse.json({
        message: "Error: Already Signed Up For this Event",
        status: 401,
      });

    }
    
    console.log("signedup?: ", signedUp)

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
      message: "Error: Already Signed Up For this Event",
      status: 200,
    });


    } catch (err) {
        return NextResponse.json(`${err}`, { status: 400 });
    }

  } catch {
    console.log("Error fetching data for email")
    return NextResponse.json({
        message: "No matching email found",
        status: 400,
      });

  }

}


