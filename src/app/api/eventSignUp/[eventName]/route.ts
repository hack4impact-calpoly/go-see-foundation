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

  type IParams2 = {
    params: {
      eventName: string;
      email: string;

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

  export async function DELETE(req: NextRequest, { params }: IParams2) {
    await connectDB();
    const { eventName, email } = params;
  
    console.log("xd: ", eventName, email)
    
    if (!eventName || !email) {
      return NextResponse.json({
        message: "Event name and user ID are required",
        status: 400,
      });
    }
  
    try {
      const result = await EventSignUp.deleteOne({ eventName: eventName, email:email }).orFail();
      return NextResponse.json({
        message: `Successfully deleted entry for event ${eventName} and user ${email}`,
        status: 200,
      });
    } catch (error) {
      console.log("Error deleting data for Event", error);
      return NextResponse.json({
        message: "No Existing Event or error occurred!",
        status: 400,
      });
    }
  }
  