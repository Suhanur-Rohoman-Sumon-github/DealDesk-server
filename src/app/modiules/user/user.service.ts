/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { userModel } from './user.model';

import httpStatus from 'http-status';
import AppError from '../../error/AppEroor';

import { adminModel } from '../admin/admin.model';
import { generateAdminId, generateUserId } from './user.utils';
import { TAdmin } from '../admin/admin.interface';
import { orderModel } from '../order_dtails/order_dtails.model';



const creteUserInDB = async (payload: TUser) => {
  const newUser = payload;
  newUser.id = await generateUserId();
  const result = await userModel.create(newUser);

  return result;
};

// TODO:add user id to removed current user send requests
const getAllUserFromDb = async () => {
  const result = await userModel.find();

  return result;
};

const getMe = async (userId:string) => {

  
   const result = await userModel.findById(userId)
  return result;
};
const createAdminIntoDB = async (payload: TAdmin) => {
  // create a user object
  const userData: Partial<TAdmin> = payload;

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;

    // create a admin (transaction-2)
    const newAdmin = await adminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


const getUserOrderInsightsFromDb = async (userId: string) => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  // 1. Get all user orders
  const userOrders = await orderModel.find({ userId: new mongoose.Types.ObjectId(userId) });

  // 2. Pending Orders (from today)
  const pendingOrders = userOrders.filter(
    order => order.orderStatus === "Pending" && new Date(order.createdAt) >= startOfToday
  );

  // 3. Today's Orders
  const todaysOrders = userOrders.filter(
    order => new Date(order.createdAt) >= startOfToday
  );

  // 4. Total Buy Today
  const totalBuyToday = todaysOrders.reduce((acc, order) => acc + order.totalAmount, 0);

  // 5. Total Buy Forever
  const totalBuyForever = userOrders.reduce((acc, order) => acc + order.totalAmount, 0);

  // 6. Last One Month Orders (Graph data by day)
  const graphData: { date: string; amount: number; orders: number }[] = [];

for (let d = new Date(oneMonthAgo); d <= today; d.setDate(d.getDate() + 1)) {
  const dateStr = d.toISOString().split("T")[0];

  const dailyOrders = userOrders.filter(order =>
    new Date(order.createdAt).toISOString().startsWith(dateStr)
  );

  const dailyTotal = dailyOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  graphData.push({
    date: dateStr,
    amount: dailyTotal,
    orders: dailyOrders.length,
  });
}



  return {
    pendingOrders: pendingOrders.length,
    todaysOrders: todaysOrders.length,
    totalBuyToday,
    totalBuyForever,
    graphData,
    totalOrders: userOrders.length,
  };
};



export const UserServices = {
  creteUserInDB,
  createAdminIntoDB,
  getMe,
  getAllUserFromDb,
 getUserOrderInsightsFromDb
};