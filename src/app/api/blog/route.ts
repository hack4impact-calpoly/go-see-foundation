import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema from "@database/eventSchema";
// TODO: replace eventSchema with proper schema path

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const blogs = await BlogSchema.find();
    console.log("looking for ALL blogs");
    console.log(blogs);
    // TODO: sort by order of date
    blogs.sort((a, b) => b.date - a.date);
    console.log("post sort...");
    console.log(blogs);
    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json(`Blogs could not be found. Error: ${err}`, {
      status: 400,
    });
  }
}
