import connectDB from "@database/db";
import {NextApiResponse, NextApiRequest } from 'next';
import { NextResponse } from 'next/server'
import Donation, {IDonation} from "@database/donationSchema";
import Users, { IUser } from "@database/userSchema";
import { headers } from 'next/headers'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// potential additions
// adding logging to how often a user creates an attempt to pay the site
export async function POST(req: Request, res: NextApiResponse){

  console.log("saving donation")
  const headersList = headers();
  const stripeSignature = headersList.get('stripe-signature');
  console.log('Stripe Signature:', stripeSignature);
  let parsed_req;

  try {
    const raw_body = await streamToString(req.body)
    console.log("comparing signatures")
    const event = stripe.webhooks.constructEvent(
     raw_body,
     stripeSignature,
     process.env.STRIPE_WEBHOOK_SECRET
     );
    console.log("signature matches!");
    parsed_req = JSON.parse(raw_body.toString());
  }

  catch (err) {
    console.log("error with signature", err);
    return NextResponse.json({ error: 'Signature Did Not Match' }, { status: 500 })
  }

  try {

    const event = parsed_req.type;
    // Handle the event
    switch (event) {
      case 'charge.succeeded':
        const paymentIntent = parsed_req.data.object;

        try{
          const user = await Users.findOne({ email: paymentIntent.receipt_email.toLowerCase() }).orFail();
          const { firstName, lastName, phoneNum } = user;          

          const newDonation = new Donation({
            amount: paymentIntent.amount / 100, // Payments are stored in cents; converts to dollars
            email: paymentIntent.receipt_email.toLowerCase(),
            date: new Date(),
            firstName,
            lastName,
            phoneNum,
          });

          await newDonation.save();
          console.log(newDonation);
        }

        catch{
          const newDonation = new Donation({
            amount : paymentIntent.amount/100, //payments are stored in cents; converts to dollars
            email : paymentIntent.receipt_email.toLowerCase(),
            date : new Date(),
            firstName: "NOT PROVIDED",
            lastName: " ",
            phoneNum: "NOT PROVIDED",
          });

          await newDonation.save();
          console.log(newDonation);
        }
        
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

async function streamToString(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
