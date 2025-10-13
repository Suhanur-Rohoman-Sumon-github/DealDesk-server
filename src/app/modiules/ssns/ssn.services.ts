import QueryBuilder from "../../builder/Querybuilder";
import { ssnUserModel } from "../ssnUser/ssnUser.model";
import { ssnSerchableField } from "./ssn.constant";
import { SSNModel } from "./ssns.model";

const getAllSnnFromDb = async (query: Record<string, unknown>) => {
  // Include both unsold and documents missing the isSold field
  const categoryFilter: Record<string, unknown> = {
    $or: [{ isSold: false }, { isSold: { $exists: false } }],
  };

  // Add category filter if provided
  if (query.categoryId) {
    categoryFilter.category = query.categoryId;
    delete query.categoryId;
  }

  // Build query
  const PostsQuery = new QueryBuilder(SSNModel.find(categoryFilter), query)
    .search(ssnSerchableField)
    .filter()
    .sort()
    .fields()
    .paginate()
    ;

  const result = await PostsQuery.modelQuery;
  const meta = await PostsQuery.countTotal();

  return { data: result, meta };
};




const buySsn = async (ssnId: string, userId: string, price: number) => {
  // Step 1: Mark SSN as sold
  const updatedSsn = await SSNModel.findByIdAndUpdate(
    ssnId,
    { isSold: true, soldTo: userId, price },
    { new: true }
  );

  if (!updatedSsn) {
    throw new Error("SSN not found or failed to update");
  }

 
  const updatedUser = await ssnUserModel.findByIdAndUpdate(
    userId,
    {
      $push: { orders: ssnId,createdAt: new Date() },
      $inc: { balance: -price }, 
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found or failed to update orders");
  }

  return {
    message: "SSN purchased successfully",
    ssn: updatedSsn,
    user: updatedUser,
  };
};

const getMySsn = async (userId: string) => {
  const userWithOrders = await ssnUserModel.findById(userId).populate({
      path: "orders",
      options: { sort: { updatedAt: -1 } }
    });

  if (!userWithOrders) {
    throw new Error("User not found");
  }

  return userWithOrders.orders;
}

export const ssnService = {
  getAllSnnFromDb,
  buySsn,
  getMySsn
};



