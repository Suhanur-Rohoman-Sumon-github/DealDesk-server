import { Types } from "mongoose";

export type TorderDetails = {
  _id?: string;
  userId: Types.ObjectId;
  products: Types.ObjectId; 
  totalAmount: number;
  paymentType: "BTC" | "ETH" | "TRC20" | "Cash";
  transactionId?: string;
  orderStatus: "Pending" | "Processing" | "Completed" | "Cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
