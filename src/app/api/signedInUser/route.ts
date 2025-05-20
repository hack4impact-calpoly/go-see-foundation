import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getEmail } from "../../../services/auth/cookietoUsertype";
import { getSession } from "services/auth/cookietoUsertype";

export async function GET(req: NextRequest) {
  const email = await getEmail(req);
  const userType = await getSession(req);

  return NextResponse.json({ email: email, userType: userType });
}
