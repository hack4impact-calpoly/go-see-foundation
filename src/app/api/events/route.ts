import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import EventSchema, { IEvent } from "@database/eventSchema";
import {getSession} from "services/auth/session-cookie"


export async function GET(req: NextRequest) {
  await connectDB();


  let cookie;
  let jwt;
  let usertype;
  try{
      cookie = req.cookies.get('Auth_Session');
      if(cookie){
          jwt = cookie.value
          usertype = await getSession(jwt);
      }

      if(usertype != null){
          console.log("auth cookie was valid!");
      } else {
          console.log("invalid / null cookie");
      }

  } catch{
      console.log("error with auth cookie");
      return;
  }

  console.log("usertype: ", usertype)

  if (usertype != 'admin'){
    return NextResponse.json(`Forbidden Action`, {  status: 400,
    });
  }

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
