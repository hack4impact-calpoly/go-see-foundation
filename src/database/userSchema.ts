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

//! Example user schema. Not guaranteed to work
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType : { type: String, required: true},
  firstName : { type: String, required: true},
  lastName : { type: String, required: true},
  phoneNum : { type: String, required: true},
  email: { type: String, required: true, unique: true }
});

// export default mongoose.models.User || mongoose.model("User", UserSchema);
const Users = mongoose.models.User || mongoose.model("User", UserSchema);

export default Users


