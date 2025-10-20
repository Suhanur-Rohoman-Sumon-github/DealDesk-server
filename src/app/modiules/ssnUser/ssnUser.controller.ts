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



/**
 * Add SSNs to user's cart
 */
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

/**
 * Remove SSNs from user's cart
 */
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

/**
 * Get user's cart
 */
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

export const ssnUserCartController = {
  addToCart,
  removeFromCart,
  getCart,
};


export const ssnUserController = {
    createSnUser,
    getUserBalance
}