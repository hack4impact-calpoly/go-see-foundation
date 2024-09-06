import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import UserSchema from "@database/userSchema";
import { getSession } from "services/auth/cookietoUsertype";

type IParams = {
  params: {
    userID: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  await connectDB();

   // makes route exclusive to admin
   let usertype;
   usertype = await getSession(req);

  if (usertype != 'admin'){
    return NextResponse.json(`Forbidden Action`, {  status: 400,
    });
  }

  const email = params.userID;

  try {
    const event = await UserSchema.findOne({ email }).orFail();
    return NextResponse.json(event);
  } 
  catch (err) {
    return NextResponse.json(`User email ${email} not found. Error: ${err}`, {
      status: 404,
    });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams){
  await connectDB();
  const email = params.userID;
  try{
    const user = await UserSchema.deleteOne({email: email}).orFail();
    return NextResponse.json(user, {status: 200});
  }
  catch(err){
    return NextResponse.json(`Error Deleting User: ${err}`, {
      status: 500,
    });
  }
}
