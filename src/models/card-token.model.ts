import mongoose, { Document, Schema } from "mongoose";

export interface ICardToken extends Document {
  card_number: number;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token: string;
  createdAt: Date;
}

const CardTokenSchema = new Schema<ICardToken>(
  {
    card_number: { type: Number, required: true },
    cvv: { type: Number, required: true },
    expiration_month: { type: String, required: true },
    expiration_year: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 900, // 15 minutes
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICardToken>("CardToken", CardTokenSchema);
