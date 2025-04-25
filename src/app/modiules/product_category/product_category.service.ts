import { TProductCategory } from "./product_category.interface";
import { CategoryModel } from "./product_category.model";


const createCategoryInDb = async (payload: TProductCategory) => {
  
  
  const result = await CategoryModel.create(payload);

  return result;
};
const getAllCategoryFromDb = async () => {
  const result = await CategoryModel.find();
  return result;
};


export const CategoryService = {
  createCategoryInDb,
  getAllCategoryFromDb
 
}