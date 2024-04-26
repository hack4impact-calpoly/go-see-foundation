import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema from "@database/blogSchema";
import {getSession} from "services/auth/cookietoUsertype"

export async function GET(req: NextRequest) {
  await connectDB();
   // makes route exclusive to admin
   let usertype;
   usertype = await getSession(req);

  if (usertype != 'admin'){
    return NextResponse.json(`Forbidden Action`, {  status: 400,
    });
  }

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
