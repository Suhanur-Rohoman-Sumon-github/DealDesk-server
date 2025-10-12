import { TUser } from "../user/user.interface";
import { ssnUserModel } from "./ssnUser.model";

const createUserInDB = async (payload: TUser) => {
   const newUser = payload;
    const result = await ssnUserModel.create(newUser);
    return result;
};

export const ssnUserServices = {
    createUserInDB,
};
