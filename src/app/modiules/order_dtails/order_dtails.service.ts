import productModel from "../products/product.model";
import { TorderDetails } from "./order_dtails.interface";
import { orderModel } from "./order_dtails.model";
import mongoose from "mongoose";


const createOrderInDb = async (payload: TorderDetails) => {
 

  

  
  // const product = await productModel.findById(products[0]);

  // if (!product) {
  //   throw new Error("Product not found.");
  // }

  // const totalAmount = product.price * quantity;

  const result = await orderModel.create(payload);

  return result;
};

const getAllOrdersFromDb = async () => {
  const result = await orderModel.find().populate("userId")
    .populate("products").sort({ createdAt: -1 });
  return result;
};
const updateOrderFromDb = async (orderId:string,orderStatus:string) => {
  const updatedProduct = await orderModel.findByIdAndUpdate(
        orderId,
        { orderStatus: orderStatus },  
        { new: true }  
      );
     
      return updatedProduct;
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
  getSingleOrdersFormDb  ,
  updateOrderFromDb
}