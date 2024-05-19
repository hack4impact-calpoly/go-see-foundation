import mongoose, { Schema } from "mongoose";

export type IResetToken = {
    email: String;
    token: String;
    expirationDate: Date;
}

const ResetTokenSchema = new Schema<IResetToken>({
    email: { type: String, required: false, unique: true},
    token: { type: String, required: true },
    expirationDate: {type: Date},
});

const ResetTokens = mongoose.models["resettokens"] || mongoose.model("resettokens", ResetTokenSchema);
export default ResetTokens;