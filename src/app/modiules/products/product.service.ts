import productModel from "./product.model";
import { TProduct } from "./products.interface";

const createProductsInDb = async (payload: TProduct) => {
  
  
  const result = await productModel.create(payload);

  return result;
};
const getAllProductsFromDb = async () => {
  const result = await productModel.find();
  return result;
};
const getSingleProductsFromDb = async (id:string) => {
  const result = await productModel.findOne({_id:id});
  return result;
};

export const ProductServices = {
  createProductsInDb,
  getAllProductsFromDb ,
  getSingleProductsFromDb  
}