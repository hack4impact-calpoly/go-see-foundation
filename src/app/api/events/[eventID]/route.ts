import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import EventSchema, { IEvent } from "@database/eventSchema";

type IParams = {
  params: {
    eventID: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  console.log(params);
  console.log(params.eventID);
  await connectDB();
  const { eventID } = params;

  try {
    const event = await EventSchema.findOne({ eventID }).orFail();
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json("Event not found.", { status: 404 });
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

export async function DELETE(req: NextRequest, { params }: IParams) {
  return NextResponse.json("Event deleted", { status: 200 });
}
