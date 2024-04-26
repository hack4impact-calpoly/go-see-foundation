import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema from "@database/blogSchema";
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
