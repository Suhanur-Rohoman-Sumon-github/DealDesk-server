import mongoose from "mongoose";
import QueryBuilder from "../../builder/Querybuilder";
import AppError from "../../error/AppEroor";
import { userModel } from "../user/user.model";
import { productSearchableFields } from "./product.conston";
import productModel from "./product.model";
import {  TProduct } from "./products.interface";

const createProductsInDB = async (
  payload: Partial<TProduct>,
  imageUrls: Express.Multer.File[] | undefined,
) => {
  const images = imageUrls ? imageUrls.map(image => image.path) : []
  const newData = { ...payload, images }

 const result = await productModel.create(newData);
  
  return result
}
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const PostsQuery = new QueryBuilder(productModel.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await PostsQuery.modelQuery;
  const meta = await PostsQuery.countTotal(); 

  return { data: result, meta }; 
};
const getSingleProductsFromDb = async (id:string) => {
  const result = await productModel.findOne({_id:id});
  return result;
};
const getRelatedProductsFromDb = async (categoryName:string) => {
  const result = await productModel.find({category:categoryName});
  return result;
};

const addFavoritePostsFromDB = async (
  userId: string,
  postId: string,
) => {
  
  const user = await userModel.findById(userId);

 
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,"User not found");
  }

  const postObjectId = new mongoose.Types.ObjectId(postId);

 
  if (user.myFavorite.includes(postObjectId)) {
    throw new AppError(500,"Product is already in favorites");
  }

 
  user.myFavorite.push(postObjectId);

 
  await user.save();
};

const getMyFavoriteProductFromDb = async (userId: string) => {
 
  const user = await userModel
    .findById(userId)
    .populate({
      path: 'myFavorite',  
      model: productModel,    
     
    });

  if (!user) {
    throw new AppError(404, 'User not found');
  }

 
  return user.myFavorite;
};

export const ProductServices = {
  createProductsInDB,
  getAllProductsFromDB ,
  getSingleProductsFromDb  ,
  addFavoritePostsFromDB,
  getMyFavoriteProductFromDb,
  getRelatedProductsFromDb
}