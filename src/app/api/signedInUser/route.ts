import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import {getEmail} from '../../../services/auth/cookietoUsertype'

export async function GET(req: NextApiRequest) {

const email = await getEmail(req);
console.log("email that will be returned: ", email)

// return res.status(200).json({ email: email });
return NextResponse.json({email: email});
// return NextResponse.json({
//     message: `email: email`,
//     status: 400,
//   });

}
