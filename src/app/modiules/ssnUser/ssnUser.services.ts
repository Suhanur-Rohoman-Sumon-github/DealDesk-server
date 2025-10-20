/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from "./ssnUser.interface";
import { ssnUserModel } from "./ssnUser.model";
import { Types } from "mongoose";
const createUserInDB = async (payload: TUser) => {
   const newUser = payload;
    const result = await ssnUserModel.create(newUser);
    return result;
};
const getUserBalance = async (identifier: string) => {
 
  const user = await ssnUserModel.findOne({
    $or: [{ _id: identifier }, { email: identifier }],
  }).populate("orders"); 

  if (!user) {
    throw new Error("User not found");
  }

  // Calculate total payments/recharges
  const totalPayment = user.transactions?.reduce((sum: number, transaction: any) => sum + transaction.amount, 0) || 0;

  // Calculate total SSNs bought
  const totalSsnBought = user.orders?.length || 0;

  // Calculate total in cart
  const totalInCart = user.cart?.length || 0;

  const transaction = user.transactions || [];
  const profilePicture = user.profilePicture

  return {
   userId: user._id,
    balance: user.balance,
    totalPayment,   
    totalSsnBought, 
    totalInCart, 
    transaction,
    profilePicture
  };
};

const updateProfilePictureInDb = async (userId:string,profilePicture:Express.Multer.File | undefined) => {
  
    if (!profilePicture) {
    throw new Error('No profile picture provided');
  }

  
  const profilePictureUrl = profilePicture.path; 

  
  const updatedUser = await ssnUserModel.findByIdAndUpdate(
    userId,
    { profilePicture: profilePictureUrl },
    { new: true } 
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser

};


const updateUserEmailInDb = async (userId: string, newEmail: string) => {
  const updatedUser = await ssnUserModel.findByIdAndUpdate(
    userId,
    { email: newEmail },
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
};

const updateUserPasswordInDb = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await ssnUserModel.findById(userId);
  if (!user) throw new Error("User not found");

  console.log(currentPassword);

  // Just check if the old password matches
  if (user.password !== currentPassword) {
    throw new Error("Current password is incorrect");
  }

  // Directly update new password (plain text)
  user.password = newPassword;
  await user.save();

  return user;
};


export const ssnUserServices = {
    createUserInDB,
    getUserBalance,
    updateProfilePictureInDb,
    updateUserEmailInDb,
    updateUserPasswordInDb
};


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



