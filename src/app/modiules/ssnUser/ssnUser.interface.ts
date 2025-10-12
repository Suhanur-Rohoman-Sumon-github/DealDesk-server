import { Types } from "mongoose";

export type TUser = {
  username: string;
  password: string;
  balance: number;
  orders: Types.ObjectId[]; 
};
