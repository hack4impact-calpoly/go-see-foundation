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
