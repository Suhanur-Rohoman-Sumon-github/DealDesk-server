import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendRespone"
import { SSNServices } from "./ssn.services"

const getAllSSnController = catchAsync(async (req, res) => {
  const query = req.query

console.log(query);
 
  const result = await SSNServices.getAllSnnFromDb(query)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

export const SSNController = {
    getAllSSnController,
}