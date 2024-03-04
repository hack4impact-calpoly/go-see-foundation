import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import UserSchema from "@database/userSchema";

type IParams = {
  params: {
    email: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { email } = params;
  console.log(email);

  try {
    const event = await UserSchema.findOne({ email }).orFail();
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json(`User email ${email} not found. Error: ${err}`, {
      status: 404,
    });
  }
}
