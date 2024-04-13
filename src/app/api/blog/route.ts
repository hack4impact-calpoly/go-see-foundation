import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema from "@database/blogSchema";
// TODO: replace eventSchema with proper schema path

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
