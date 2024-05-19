import mongoose, { Schema } from "mongoose";

export type IResetToken = {
    email: String;
    token: String;
    expirationDate: Date;
}

const ResetTokenSchema = new Schema<IResetToken>({
    email: { type: String, required: true, unique: false},
    token: { type: String, required: true},
    expirationDate: {type: Date, required: true},
});

const ResetTokens = mongoose.models["resettokens"] || mongoose.model("resettokens", ResetTokenSchema);
export default ResetTokens;