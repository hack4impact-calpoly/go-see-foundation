import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema from "@database/blogSchema";

type IParams = {
  params: {
    blogID: string;
  };
};

export async function DELETE(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { blogID } = params;

  try {
    await BlogSchema.deleteOne({ blogID }).orFail();
    return NextResponse.json(
      { message: `Success: Blog deleted` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Blog not found. Error: ${err}` },
      { status: 404 }
    );
  }
}
