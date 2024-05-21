import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema from "@database/blogSchema";
import {getSession} from "services/auth/cookietoUsertype"
import BlogSchema, { IEvent } from "@database/blogSchema";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const blogs = await BlogSchema.find().orFail();
    blogs.sort((a, b) => b.date - a.date);
    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json(`Blogs could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { picture, alt, description, date, name, blogID, author }: IEvent =
      await req.json();
    if (!(picture && alt && description && date && name && blogID && author)) {
      return NextResponse.json("Failed: Invalid Blog, missing fields", {
        status: 400,
      });
    }
    const newBlog = new BlogSchema({
      picture,
      alt,
      description,
      date,
      name,
      blogID,
      author,
    });
    await newBlog.save();
    return NextResponse.json({
      message: "Success: Blog uploaded",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
