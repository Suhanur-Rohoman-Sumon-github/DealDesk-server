import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { ProductServices } from "./product.service";
import { StatusCodes } from "http-status-codes";
const createProducts = catchAsync(async (req, res) => {

  const { title, description, price, stock, category, buyPrice, sellprice } =
    JSON.parse(req.body.data)

    console.log(req.body.data);

  let images: Express.Multer.File[] = []
  console.log(images);

  if (Array.isArray(req.files)) {
   
    images = req.files as Express.Multer.File[]
  } else if (req.files && typeof req.files === 'object') {
    
    images = Object.values(req.files).flat() as Express.Multer.File[]
  }

  const result = await ProductServices.createProductsInDB(
    { title, description, sellprice,buyPrice, stock, category},
    images,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  })
})
const getALlProducts = catchAsync(async (req, res) => {
  const query = req.query


 
  const result = await ProductServices.getAllProductsFromDB(query)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})
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
const getRelatedProducts = catchAsync(async (req, res) => {
    const { categoryName } = req.params;
 
  const result = await ProductServices.getRelatedProductsFromDb(categoryName);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'product is retrieve successfully',
    data: result,
  });
});

const addToFavorite = catchAsync(async (req, res) => {
  const postsId = req.params.postId;
  const userId = req.params.userId;

  const result = await ProductServices.addFavoritePostsFromDB(userId, postsId);



  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'favorite product added successfully',
    data: result,
  });
});

const getFavoriteProducts = catchAsync(async (req, res) => {
  
  const userId = req.params.userId;

  const result = await ProductServices.getMyFavoriteProductFromDb(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'favorite product added successfully',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  
 const { productId } = req.params;




  const result = await ProductServices.updatedProductFromDb(productId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' product updated successfully',
    data: result,
  });
});

export const ProductController = {
  createProducts, 
  getALlProducts,
  getSingleProducts,
  addToFavorite,
  getFavoriteProducts,
  getRelatedProducts,
  updateProduct
}