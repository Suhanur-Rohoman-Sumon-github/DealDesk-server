/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/Querybuilder";
import { ssnUserModel } from "../ssnUser/ssnUser.model";
import { TUser } from "../user/user.interface";
import { SSNModel } from "./ssns.model";
import Binance from 'binance-api-node';
 import { Document } from "mongoose";
// Initialize client with your API key and secret
const client = Binance({
  apiKey: process.env.BINANCE_API_KEY!,
  apiSecret: process.env.BINANCE_API_SECRET!,
});


const getAllSnnFromDb = async (query: Record<string, unknown>) => {
  const categoryFilter: Record<string, unknown> = {
    $or: [{ isSold: false }, { isSold: { $exists: false } }],
  };

  if (query.categoryId) {
    categoryFilter.category = query.categoryId;
    delete query.categoryId;
  }

  // Convert page & limit to numbers
  if (query.page) query.page = Number(query.page);
  if (query.limit) query.limit = Number(query.limit);

  // Partial string matches
  const searchQuery: Record<string, any> = {};
  if (query.firstName) searchQuery.firstName = { $regex: query.firstName, $options: "i" };
  if (query.lastName) searchQuery.lastName = { $regex: query.lastName, $options: "i" };
  if (query.city) searchQuery.city = { $regex: query.city, $options: "i" };
  if (query.state) searchQuery.state = { $regex: query.state, $options: "i" };
  if (query.zipCode) searchQuery.zipCode = query.zipCode;

if (query.dateOfBirthFrom || query.dateOfBirthTo) {
  // Convert strings to numbers
  const fromYear = query.dateOfBirthFrom ? Number(query.dateOfBirthFrom) : undefined;
  const toYear = query.dateOfBirthTo ? Number(query.dateOfBirthTo) : undefined;

  // Filter function for Mongoose
  searchQuery.$expr = {
    $and: [
      fromYear !== undefined ? { $gte: [{ $year: { $dateFromString: { dateString: "$dateOfBirth" } } }, fromYear] } : {},
      toYear !== undefined ? { $lte: [{ $year: { $dateFromString: { dateString: "$dateOfBirth" } } }, toYear] } : {},
    ],
  };
}
  // Merge filters
  const finalQuery = { ...categoryFilter, ...searchQuery };

  const PostsQuery = new QueryBuilder(SSNModel.find(finalQuery), query)
    .sort()
    .fields()
    .paginate();

  const result = await PostsQuery.modelQuery;
  const meta = await PostsQuery.countTotal();

  return { data: result, meta };
};



const buySsn = async (ssnId: string, userId: string, price: number) => {
  // Step 1: Mark SSN as sold
  const updatedSsn = await SSNModel.findByIdAndUpdate(
    ssnId,
    { isSold: true, soldTo: userId, price },
    { new: true }
  );

  if (!updatedSsn) {
    throw new Error("SSN not found or failed to update");
  }

 
  const updatedUser = await ssnUserModel.findByIdAndUpdate(
    userId,
    {
      $push: { orders: ssnId,createdAt: new Date() },
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



type Deposit = {
  amount: string;
  coin: string;
  network: string;
  status: number;
  txId: string;
  insertTime: number;
  asset: string;
  address: string;
  addressTag?: string;
  txType: string;
  confirmTimes: string;
}

const makePayment = async (userId: string, amount: number, transactionId: string, coin: string) => {
  // Step 1: Fetch deposit history
  const depositHistory = await client.depositHistory({ coin }) as any;

  // Step 2: Binance API might return { depositList: Deposit[] }
  const deposits: Deposit[] = depositHistory.depositList || [];

  // Step 3: Find matching transaction
  const tx = deposits.find(d => d.txId === transactionId && d.status === 1);
  if (!tx) {
    throw new Error("Transaction not found or not completed on Binance.");
  }

  // Step 4: Fetch user from DB
 

  const user = await ssnUserModel.findById(userId) as (TUser & { processedTxIds?: string[], balance: number } & Document);
  if (!user) throw new Error("User not found");

  // Step 5: Check if txId already processed
  if (user.processedTxIds?.includes(transactionId)) {
    throw new Error("Transaction already processed");
  }

  // Step 6: Update balance and save txId
  user.balance += amount;
  user.processedTxIds = [...(user.processedTxIds || []), transactionId];
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



