import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import EventSchema, { IEvent } from "@database/eventSchema";


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

  try {
    const { picture, alt, description, date, name, eventID }: IEvent =
      await req.json();
    if (!(picture && alt && description && date && name && eventID)) {
      return NextResponse.json("Failed: Invalid Event", { status: 400 });
    }

    const newEvent = new EventSchema({
      picture,
      alt,
      description,
      date,
      name,
      eventID,
    });
    console.log(newEvent);
    await newEvent.save();
    return NextResponse.json("Success: Event uploaded", { status: 200 });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
