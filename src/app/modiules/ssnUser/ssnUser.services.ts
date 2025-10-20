/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "../user/user.interface";
import { ssnUserModel } from "./ssnUser.model";

const createUserInDB = async (payload: TUser) => {
   const newUser = payload;
    const result = await ssnUserModel.create(newUser);
    return result;
};
const getUserBalance = async (identifier: string) => {
 
  const user = await ssnUserModel.findOne({
    $or: [{ _id: identifier }, { email: identifier }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    userId: user._id,
    balance: user.balance,
    
  };
};

import { Types } from "mongoose";

/**
 * Add SSNs to the user's cart
 * @param userId - The user's ID
 * @param ssnIds - Array of SSN IDs to add
 */
const addToCart = async (userId: string, ssnIds: string[]) => {
  if (!Types.ObjectId.isValid(userId)) throw new Error("Invalid user ID");

  const user = await ssnUserModel.findById(userId);
  if (!user) throw new Error("User not found");

  // Avoid duplicates: compare stringified ObjectIds
  const existingIds = user.cart.map((id) => id.toString());
  const uniqueSSNs = ssnIds.filter((id) => !existingIds.includes(id));

  // convert string ids to ObjectId instances before pushing
  const objectIds = uniqueSSNs.map((id) => new Types.ObjectId(id));
  user.cart.push(...objectIds);
  await user.save();

  return user.cart;
};


const removeFromCart = async (userId: string, ssnIds: string[]) => {
  const user = await ssnUserModel.findById(userId);
  if (!user) throw new Error("User not found");

  user.cart = user.cart.filter((id) => !ssnIds.includes(id.toString()));
  await user.save();

  return user.cart;
};

/**
 * Get user's cart
 * @param userId - The user's ID
 */
const getCart = async (userId: string) => {
  const user = await ssnUserModel.findById(userId).populate("cart");
  if (!user) throw new Error("User not found");

  return user.cart;
};

export const ssnUserCartService = {
  addToCart,
  removeFromCart,
  getCart,
};


export const ssnUserServices = {
    createUserInDB,
    getUserBalance
};
