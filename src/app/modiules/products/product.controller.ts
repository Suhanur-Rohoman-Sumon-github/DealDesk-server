import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { ProductServices } from "./product.service";
import { StatusCodes } from "http-status-codes";
const createProducts = catchAsync(async (req, res) => {
 
  const result = await ProductServices.createProductsInDb(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'product is created successfully',
    data: result,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
 
  const result = await ProductServices.getAllProductsFromDb();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'product is retrieve successfully',
    data: result,
  });
});
const getSingleProducts = catchAsync(async (req, res) => {
    const { id } = req.params;
 
  const result = await ProductServices.getSingleProductsFromDb(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'product is retrieve successfully',
    data: result,
  });
});

export const ProductController = {
  createProducts, 
  getAllProducts,
  getSingleProducts
}