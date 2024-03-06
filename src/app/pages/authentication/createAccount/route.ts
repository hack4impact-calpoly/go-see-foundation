import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../helpers/db';
import UserSchema, {IUser} from '../../../../database/userSchema';

connectDB(); // Make sure to connect to the database

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const newUser = new UserSchema(req.body);
      await newUser.save();

      res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
