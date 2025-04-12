import mongoose, { Schema } from "mongoose";
import { VerificationTypes } from "../utils/constants/constants";
import { generateUniqueCodes } from "../utils/helper";

//? for types of code to generate we have to define Verificationstype enum type

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId; // remeber this thing
  code: string;
  type: VerificationTypes;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, //index is created for the email
  },
  code: {
    type: String,
    required: true,
    unique: true,
    default: generateUniqueCodes, // generate unique codes;
  },
  type: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VerificationModel = mongoose.model<VerificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes" // this creates an different collection for codes
);
export default VerificationModel;
