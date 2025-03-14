import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/", req.nextUrl));

  // Clear authentication cookies
  response.cookies.set("Auth_Session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
