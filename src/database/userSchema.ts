import mongoose, { Schema } from "mongoose";

export type IUser = {
  username: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
  email: string;
};


const UserSchema = new Schema<IUser>({
  username: { type: String, required: false, unique: false },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNum: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});


const Users = mongoose.models["users"] || mongoose.model("users", UserSchema);

export default Users;
