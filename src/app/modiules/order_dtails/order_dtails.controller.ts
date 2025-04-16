import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { StatusCodes } from "http-status-codes";
import { Orderservices } from "./order_dtails.service";
const createOrder = catchAsync(async (req, res) => {
 
  const result = await Orderservices.createOrderInDb(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'order is created successfully',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
 
  const result = await Orderservices.getAllOrdersFromDb();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'order is retrieve successfully',
    data: result,
  });
});
const getSingleOrders = catchAsync(async (req, res) => {
    const { userId } = req.params;
 
  const result = await Orderservices.getSingleOrdersFormDb(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'single order is retrieve successfully',
    data: result,
  });
});

export const OrdersControllers = {
  createOrder, 
  getAllOrders,
  getSingleOrders
}