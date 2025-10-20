/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { ssnUserModel } from "../ssnUser/ssnUser.model";
import { TUser } from "../user/user.interface";
import { SSNModel } from "./ssns.model";
import Binance from 'binance-api-node';
 import { Document } from "mongoose";
// Initialize client with your API key and secret
const client = Binance({
  apiKey: config.binanceAoiKey,
  apiSecret: config.binanceApiSecret,
});



const getAllSnnFromDb = async (query: Record<string, unknown>) => {
  const filters: Record<string, any> = { $or: [{ isSold: false }, { isSold: { $exists: false } }] };

  if (query.categoryId) filters.category = query.categoryId;

  // Search optimization
  if (typeof query.searchTerm === "string" && query.searchTerm) {
    filters.$text = { $search: query.searchTerm.trim() };
  } else {
    if (query.city) filters.city = { $regex: `^${query.city}`, $options: "i" };
    if (query.state) filters.state = { $regex: `^${query.state}`, $options: "i" };
    if (query.zipCode) filters.zipCode = query.zipCode;
  }

  if (query.dateOfBirthFrom || query.dateOfBirthTo) {
    filters.birthYear = {};
    if (query.dateOfBirthFrom)
      filters.birthYear.$gte = Number(query.dateOfBirthFrom);
    if (query.dateOfBirthTo)
      filters.birthYear.$lte = Number(query.dateOfBirthTo);
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;

  const result = await SSNModel.find(filters)
    .select("firstName lastName city state zipCode birthYear category")
    .sort({ _id: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await SSNModel.countDocuments(filters);
  const totalPage = Math.ceil(total / limit);

  return { data: result, meta: { page, limit, total, totalPage } };
};




const buySsn = async (ssnId: string, userId: string, price: number) => {
  // Step 0: Get the user first
  const user = await ssnUserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Step 1: Check if user has enough balance
  if (user.balance < price) {
    throw new Error("Insufficient balance. Please recharge your account.");
  }

  // Step 2: Mark SSN as sold
  const updatedSsn = await SSNModel.findByIdAndUpdate(
    ssnId,
    { isSold: true, soldTo: userId, price },
    { new: true }
  );

  if (!updatedSsn) {
    throw new Error("SSN not found or failed to update");
  }

  // Step 3: Update user orders and balance
  const updatedUser = await ssnUserModel.findByIdAndUpdate(
    userId,
    {
      $push: { orders: ssnId, createdAt: new Date() },
      $inc: { balance: -price },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found or failed to update orders");
  }

  return {
    message: "SSN purchased successfully",
    ssn: updatedSsn,
    user: updatedUser,
  };
};


const getMySsn = async (userId: string) => {
  const userWithOrders = await ssnUserModel.findById(userId).populate({
      path: "orders",
      options: { sort: { updatedAt: -1 } }
    });

  if (!userWithOrders) {
    throw new Error("User not found");
  }

  return userWithOrders.orders;
}


const makePayment = async (userId: string, amount: number, transactionId: string, coin: string) => {
  // Step 1: Fetch deposit history
  const depositHistory = await client.depositHistory({ coin }) as any;



  // Step 3: Find matching transaction
  const tx = depositHistory.find((d: { txId: string; status: number; }) => d.txId === transactionId && d.status === 1);

  if (!tx) {
    throw new Error("Transaction not found or not completed .");
  }

 

  // Step 4: Fetch user from DB
 

  const user = await ssnUserModel.findById(userId) as (TUser & { processedTxIds?: string[], balance: number } & Document);
  if (!user) throw new Error("User not found");

  // Step 5: Check if txId already processed
  if (user.processedTxIds?.includes(transactionId)) {
    throw new Error("Transaction already processed");
  }

  // Step 6: Update balance and save txId
  user.balance += tx.amount ? parseFloat(tx.amount) : 0;
  user.processedTxIds = [...(user.processedTxIds || []), transactionId];
  user.transactions = [...(user.transactions || []), {
    txId: transactionId,
    amount: tx.amount ? parseFloat(tx.amount) : 0,    
    coin: coin,
    date: new Date(),
    type: 'recharge'
  }];
  await user.save();

  return {
    message: "Payment successful",
    balance: user.balance,
  };
};


export default makePayment;


export const ssnService = {
  getAllSnnFromDb,
  buySsn,
  getMySsn,
  makePayment
};



