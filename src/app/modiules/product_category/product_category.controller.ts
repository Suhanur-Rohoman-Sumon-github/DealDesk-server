import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";

import { StatusCodes } from "http-status-codes";
import { CategoryService } from "./product_category.service";
const createCategory = catchAsync(async (req, res) => {
 
  const result = await CategoryService.createCategoryInDb(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category  is created successfully',
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
 
  const result = await CategoryService.getAllCategoryFromDb();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is retrieve successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory, 
  getAllCategory,
 
}