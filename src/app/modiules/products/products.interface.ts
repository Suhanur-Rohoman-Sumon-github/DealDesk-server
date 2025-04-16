import  { Types } from "mongoose";

export type TProduct = {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: string[];
  numReviews: number;
  discount?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  shippingAndReturns?: string;
}