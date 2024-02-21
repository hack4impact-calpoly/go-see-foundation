import emailjs from 'emailjs-com';
import { NextRequest, NextResponse } from "next/server";

interface Email {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: Email = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message.'
    };

    if (!body || !(body.name && body.email && body.message)) {
      console.error('Invalid request. Missing required fields.');
      
      if (!body) {
        console.error('Received empty body:', body);
      } else {
        console.error('Missing fields:', {
          name: !body.name,
          email: !body.email,
          message: !body.message,
        });
        console.log('Received request:', req);
      }

      return NextResponse.json({ error: 'Invalid request. Missing required fields.' }, { status: 400 });
    }

    const { name, email, message } = body;

    const emailParams = {
      to_name: email,
      from_name: name,
      message,
    };

    const response = await emailjs.send('service_9qu0p52', 'template_8iw7acv', emailParams, "Zw5OFi0OEo2qOzWRb");

    console.log(response);
    return NextResponse.json({ success: true, message: 'Email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

