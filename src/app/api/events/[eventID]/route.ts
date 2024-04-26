import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import EventSchema from "@database/eventSchema";
import {getSession} from "services/auth/cookietoUsertype"

type IParams = {
  params: {
    eventID: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  await connectDB();

    // makes route exclusive to admin
    let usertype;
    usertype = await getSession(req);
  
    if (usertype != 'admin'){
      return NextResponse.json(`Forbidden Action`, {  status: 400, });
    }



  const { eventID } = params;

  try {
    const event = await EventSchema.findOne({ eventID }).orFail();
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json(`Event ${eventID} not found. Error: ${err}`, {
      status: 404,
    });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { eventID } = params;

  try {
    await EventSchema.deleteOne({ eventID }).orFail();
    return NextResponse.json(`Event deleted.`, { status: 200 });
  } catch (err) {
    return NextResponse.json(`Event not found. Error: ${err}`, { status: 400 });
  }
}
