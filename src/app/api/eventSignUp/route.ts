import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import eventSignUpSchema,  { IEventSignUp } from "@database/eventSignUpSchema";
import Users from "@database/userSchema";
import EventSignUp from "@database/eventSignUpSchema";


export async function POST(req: NextRequest) {
  await connectDB();
  console.log("hereeeee")

  try {
    const { email, needSightedGuide,attendedEventBefore, comments,  eventName } = await req.json();
    const signedUp = await Users.findOne({ email: email, eventName: eventName });
    console.log("signedup?: ", signedUp)


    if(signedUp !== null){
      return NextResponse.json({
        message: "Error: Already Signed Up For this Event",
        status: 400,
      });

    }
    
    console.log("signedup?: ", signedUp)

    const user = await Users.findOne({ email}).orFail();
    console.log("user: ", user)

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
      message: "Successful Event Sign Up!",
      status: 200,
    });


    } catch (err) {
      
        console.log("error: ", err)
        return NextResponse.json(`${err}`, { status: 400 });
    }

  } catch {
    console.log("Error fetching data for email")
    return NextResponse.json({
        message: "Please Sign In",
        status: 400,
      });

  }

}


