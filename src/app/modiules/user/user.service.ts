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
import { sendEmail } from '../../utils/sendEmail';
import { generateVerificationCode } from '../../utils/generateVerificationCode';


const createUserInDB = async (payload: TUser) => {
  const newUser = payload;
  newUser.id = await generateUserId(); // Assume this function generates a unique user ID
  newUser.isEmailVerified = false;

  // Generate a verification code
  const verificationCode = generateVerificationCode();
  newUser.emailVerificationCode = verificationCode;

  const result = await userModel.create(newUser);

 

  // Send verification email with the verification code
 

  await sendEmail(newUser.email, `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f4;">
      <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p style="color: #555;">Thanks for signing up! Please verify your email address by using the code below:</p>
        <h3 style="color: #4CAF50;">${verificationCode}</h3>
        <p style="color: #555;">Alternatively, you can click the button below to verify:</p>
       
        <p style="color: #999; margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
      </div>
      <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 20px;">© 2025 Your Company. All rights reserved.</p>
    </div>
  `,'your email verification code');

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
 const getUserVerificationCodeFromDb = async (userEmail: string) => {
  console.log(userEmail);
  if (!userEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, "User email is required");
  }

  const user = await userModel.findOne({ email: userEmail });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user.emailVerificationCode) {
    throw new AppError(httpStatus.NOT_FOUND, "No verification code found for this user");
  }

  return {
    emailVerificationCode: user.emailVerificationCode,
    isEmailVerified: user.isEmailVerified,
  };
};

const verifyEmailFromDb = async (code: string) => {
  if (!code || typeof code !== 'string') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid or expired verification token');
  }
  const user = await userModel.findOne({ emailVerificationCode: code });
   if (!user) {
   throw new AppError(httpStatus.NOT_FOUND, 'Invalid or expired verification token');
  }
  
  user.isEmailVerified = true;
  user.emailVerificationCode = null; 
  await user.save();
 await sendEmail(user.email, `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f4;">
      <div style="background-color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p style="color: #555;">Thanks for signing up! Please verify your email address by using the code below:</p>
        
        <p style="color: #555;">Alternatively, you can click the button below to verify:</p>
       
        <p style="color: #999; margin-top: 20px;">If you did not request this, you can safely ignore this email.</p>
      </div>
      <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 20px;">© 2025 Your Company. All rights reserved.</p>
    </div>
  `,'welcome to our platform, your email is verified successfully');
}



export const UserServices = {
  createUserInDB,
  createAdminIntoDB,
  getMe,
  getAllUserFromDb,
 getUserOrderInsightsFromDb,
 verifyEmailFromDb,
 getUserVerificationCodeFromDb
};