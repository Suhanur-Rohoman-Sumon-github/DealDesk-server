import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  console.log(userData);

  const result = await UserServices.creteUserInDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is created successfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is retrieve successfully',
    data: result,
  });
});


const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
 const userId = req.params.userId
  

  const result = await UserServices.getMe(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user  retrieve successfully',
    data: result,
  });
});
const getUserOrderInsights = catchAsync(async (req, res) => {
 const userId = req.params.userId
  

  const result = await UserServices.getUserOrderInsightsFromDb(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user data  retrieve successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
  createAdmin,
  getMe,
  getAllUser,
getUserOrderInsights
};