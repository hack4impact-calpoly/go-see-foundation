import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema, { IEvent } from "@database/blogSchema";

type IParams = {
  params: {
    blogID: string;
  };
};

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

export async function DELETE(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { blogID } = params;

  try {
    await BlogSchema.deleteOne({ blogID }).orFail();
    return NextResponse.json(`Success: Blog deleted`, { status: 200 });
  } catch (err) {
    return NextResponse.json(`Event not found. Error: ${err}`, { status: 400 });
  }
}
