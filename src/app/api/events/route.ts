import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import EventSchema, { IEvent } from "@database/eventSchema";
import {getSession} from "services/auth/cookietoUsertype"

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const events = await EventSchema.find();
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json(`Events could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  // makes route exclusive to admin
  let usertype;
  usertype = await getSession(req);
  
  if (usertype != 'admin'){
    return NextResponse.json(`Forbidden Action`, {  status: 400, });
  }

  try {
    const { picture, alt, description, date, name, eventID, location, startTime, endTime }: IEvent =
      await req.json();
    if (!(picture && alt && description && date && name && eventID)) {
      console.log("invalid event!")
      return NextResponse.json("Failed: Invalid Event", { status: 400 });
    }

    const newEvent = new EventSchema({
      picture,
      alt,
      description,
      date,
      name,
      eventID,
      startTime,
      endTime, 
      location
    });
    console.log(newEvent);
    await newEvent.save();
    return NextResponse.json({
      message: "Success: Event uploaded",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
