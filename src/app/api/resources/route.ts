import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import ResourceSchema, { IResource } from "@database/resourceSchema";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const resources = await ResourceSchema.find().orFail();
    resources.sort((a, b) => a.title.localeCompare(b.title));
    return NextResponse.json(resources);
  } catch (err) {
    return NextResponse.json({
      message: `Resources could not be found. Error: ${err}`,
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { picture, alt, title, url }: IResource = await req.json();
    if (!(picture && alt && title && url)) {
      return NextResponse.json({
        message: "Failed: Invalid Resource, missing field(s)",
        status: 400,
      });
    }
    const newResource = new ResourceSchema({
      picture,
      alt,
      title,
      url,
    });
    await newResource.save();
    return NextResponse.json({
      message: "Success: Resource uploaded",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: `Resource POST Failed. Error: ${err}`,
      status: 400,
    });
  }
}
