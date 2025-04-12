import mongoose, { Document, Schema } from "mongoose";
import { ThirtyDaysFromNow } from "../utils/helper";

export interface SessionDocument extends Document {
  userId: mongoose.Types.ObjectId; // making relation with user
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // taking User Model refrence
    index: true,
  },
  userAgent: { type: String, required: false },
  expiresAt: {
    type: Date,
    required: true,
    default: ThirtyDaysFromNow,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
