import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { ssnUserServices } from "./ssnUser.services";
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

export const ssnUserController = {
    createSnUser,
}