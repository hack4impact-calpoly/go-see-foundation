import { NextRequest, NextResponse } from "next/server";
import connectDB from "@database/db";
import BlogSchema, { IBlog } from "@database/blogSchema";

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


export async function PUT(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { blogID } = params;

  try {
    const updatedData: Partial<IBlog> = await req.json();

    if (!Object.keys(updatedData).length) {
      return NextResponse.json(
        { message: "Failed: No fields provided to update" },
        { status: 400 }
      );
    }

    const updatedBlog = await BlogSchema.findOneAndUpdate(
      { blogID },
      updatedData,
      { new: true, runValidators: true } 
    ).orFail();

    return NextResponse.json(
      { message: "Success: Blog updated", updatedBlog },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Failed: Blog not found or could not be updated. Error: ${err}` },
      { status: 404 }
    );
  }
}