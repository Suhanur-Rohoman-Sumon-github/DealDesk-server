import { TorderDetails } from "./order_dtails.interface";
import { orderModel } from "./order_dtails.model";
import mongoose from "mongoose";
const createOrderInDb = async (payload: TorderDetails) => {
  
  
  const result = await orderModel.create(payload);

  return result;
};
const getAllOrdersFromDb = async () => {
  const result = await orderModel.find().populate("userId")
    .populate("products");
  return result;
};


const getSingleOrdersFormDb = async (id: string) => {
  
  const objectId = new mongoose.Types.ObjectId(id); 
  const result = await orderModel
    .find({ userId: objectId })
    .populate("userId")
    .populate("products");

  return result;
};


export const Orderservices = {
  createOrderInDb,
  getAllOrdersFromDb ,
  getSingleOrdersFormDb  
}