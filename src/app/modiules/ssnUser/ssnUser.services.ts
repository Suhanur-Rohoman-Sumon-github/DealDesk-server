import { TUser } from "../user/user.interface";
import { ssnUserModel } from "./ssnUser.model";

const createUserInDB = async (payload: TUser) => {
   const newUser = payload;
    const result = await ssnUserModel.create(newUser);
    return result;
};
const getUserBalance = async (identifier: string) => {
 
  const user = await ssnUserModel.findOne({
    $or: [{ _id: identifier }, { email: identifier }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    userId: user._id,
    balance: user.balance,
    
  };
};

export const ssnUserServices = {
    createUserInDB,
    getUserBalance
};
