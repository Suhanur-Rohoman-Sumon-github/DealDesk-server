import QueryBuilder from "../../builder/Querybuilder";
import { ssnSerchableField } from "./ssn.constant";
import { SSNModel } from "./ssns.model";

const getAllSnnFromDb = async (query: Record<string, unknown>) => {
  
  let categoryFilter = {};
  if (query.categoryId) {
    categoryFilter = { category: query.categoryId };
    
    delete query.categoryId;
  }
  const PostsQuery = new QueryBuilder(SSNModel.find(categoryFilter), query)
    .search(ssnSerchableField)
    .filter()
    .sort()
    .fields()
  const result = await PostsQuery.modelQuery;
  const meta = await PostsQuery.countTotal(); 

  return { data: result, meta }; 
};

export const SSNServices = {
    getAllSnnFromDb,
}   