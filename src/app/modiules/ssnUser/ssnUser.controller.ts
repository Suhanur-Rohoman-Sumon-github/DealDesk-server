import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { ssnUserCartService, ssnUserServices } from "./ssnUser.services";
import httpStatus from 'http-status';
const createSnUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await ssnUserServices.createUserInDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is created successfully',
    data: result,
  });
});
const getUserBalance = catchAsync(async (req, res) => {
  const {identifier} = req.params;
  const result = await ssnUserServices.getUserBalance(identifier);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is balance retrieve successfully',
    data: result,
  });
});


const addToCart = catchAsync(async (req, res) => {
  const { userId, ssnIds } = req.body; // expects { userId: string, ssnIds: string[] }
  const updatedCart = await ssnUserCartService
  .addToCart(userId, ssnIds);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SSNs added to cart successfully",
    data: updatedCart,
  });
});


const removeFromCart = catchAsync(async (req, res) => {
  const { userId, ssnIds } = req.body; // expects { userId: string, ssnIds: string[] }
  const updatedCart = await ssnUserCartService.removeFromCart(userId, ssnIds);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SSNs removed from cart successfully",
    data: updatedCart,
  });
});


const getCart = catchAsync(async (req, res) => {
  const { userId } = req.params; // expects /cart/:userId
  const cart = await ssnUserCartService.getCart(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User cart retrieved successfully",
    data: cart,
  });
});


const updateProfilePicture = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const profilePicture = req.file
  

  const result = await ssnUserServices.updateProfilePictureInDb(userId,profilePicture );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user  profile picture updated successfully',
    data: result,
  });
});

const updateUserEmail = catchAsync(async (req, res) => {
 
  const { newEmail,userId } = req.body;

 await ssnUserServices.updateUserEmailInDb(userId, newEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Email updated successfully",
    data: "",
  });
});

const updateUserPassword = catchAsync(async (req, res) => {

  const { currentPassword, newPassword,userId } = req.body;

 await ssnUserServices.updateUserPasswordInDb(
    userId,
    currentPassword,
    newPassword
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password updated successfully",
    data: "",
  });
});


export const ssnUserController = {
    createSnUser,
    getUserBalance,
    updateProfilePicture,
    updateUserEmail,
    updateUserPassword
}

export const ssnUserCartController = {
  addToCart,
  removeFromCart,
  getCart,
};