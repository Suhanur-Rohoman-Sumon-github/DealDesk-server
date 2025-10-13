import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendRespone"
import { ssnService } from "./ssn.services"


const getAllSSnController = catchAsync(async (req, res) => {
  const query = req.query
  console.log(query);
  const result = await ssnService.getAllSnnFromDb(query)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

const buySsnController = catchAsync(async (req, res) => {
  const { ssnId, userId, price } = req.body;  
 
  const result = await ssnService.buySsn(ssnId, userId, price);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'SSN bought successfully',
    data: result,
  });
});
const getMySsn = catchAsync(async (req, res) => {
  const { userId } = req.params;  
 
  const result = await ssnService.getMySsn(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My SSN retrieved successfully',
    data: result,
  });
});
const makePayment = catchAsync(async (req, res) => {
  const { userId } = req.params;  
 
  const result = await ssnService.getMySsn(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My SSN retrieved successfully',
    data: result,
  });
});

export const SSNController = {
    getAllSSnController,
    buySsnController,
    getMySsn,
    makePayment
}