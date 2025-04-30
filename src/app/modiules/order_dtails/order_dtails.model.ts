import mongoose, {  model, models } from "mongoose";
import { TorderDetails } from "./order_dtails.interface";

const orderSchema = new mongoose.Schema<TorderDetails>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    totalAmount: { type: Number, required: true },
    paymentType: {
      type: String,
      enum: ["BTC", "ETH", "TRC20", "Cash"],
      required: true,
    },

    transactionId: { type: String }, 
    ZipCode: { type: String },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const orderModel = models.Order || model("Order", orderSchema);

