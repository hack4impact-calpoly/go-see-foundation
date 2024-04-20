import connectDB from "@database/db";
import {NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import Donation, {IDonation} from "@database/donationSchema";

// potential additions
// adding logging to how often a user creates an attempt to pay the site

export async function POST(req: Request, res: NextApiResponse) {
  const parsed_req = await req.json();
  //console.log("DATa, ", parsed_req);
  try {
    await connectDB();
    const event = parsed_req.type;
    console.log('Received event:', parsed_req);
    // Handle the event
  switch (event) {
    case 'charge.succeeded':
      
      const paymentIntent = parsed_req.data.object;

      const newDonation = new Donation({
        amount : paymentIntent.amount/100, //payments are stored in cents; converts to dollars
        email : paymentIntent.receipt_email,
        date : new Date()
      });

      await newDonation.save();
      console.log(newDonation);
      break;

    default:
      console.log(`Unhandled event type ${parsed_req.type}`);
  }
  return NextResponse.json({received: true}, { status: 200 });

  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }
}
