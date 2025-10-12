import { model, Schema } from "mongoose";
import { TSSN } from "./ssm.interface";

const ssnSchema = new Schema<TSSN>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: Number, required: true },
    ssnNumber: { type: String, required: true },
    gender: { type: String, enum: ["M", "F", "Other"], required: true },
    alternatePhoneNumber: { type: String },
    accountNumber: { type: String, required: true },
    bank: { type: String, required: true },
    routingNumber: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const SSNModel = model<TSSN>("SSN", ssnSchema);