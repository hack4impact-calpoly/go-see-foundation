import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import {getEmail} from '../../../services/auth/cookietoUsertype'

export async function GET(req: NextRequest) {
    const email = await getEmail(req);
    console.log("email that will be returned: ", email)

// return res.status(200).json({ email: email });
    return NextResponse.json({email: email});
// return NextResponse.json({
//     message: `email: email`,
//     status: 400,
//   });

}
