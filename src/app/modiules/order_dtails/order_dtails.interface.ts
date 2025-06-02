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
  ZipCode?: string;
  proxyAddress?: string;
  quantity: number;
  shippingAddress?: Types.ObjectId;
  
  billingAddress?: string;
  orderNumber?: string;
  deliveryDate?: Date;
  estimatedDeliveryDate?: Date;
  trackingNumber?: string;
  deliveryStatus?: "Pending" | "Shipped" | "Delivered" | "Returned";
  paymentStatus?: "Pending" | "Completed" | "Failed" | "Refunded";
  discountCode?: string;
  discountAmount?: number;
  taxAmount?: number;
  shippingCost?: number;
  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
  isExpressDelivery?: boolean;
  expressDeliveryCost?: number;
  customerFeedback?: string;

}
