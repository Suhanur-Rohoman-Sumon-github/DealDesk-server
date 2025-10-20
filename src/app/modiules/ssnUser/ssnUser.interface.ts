import { Model, Types } from "mongoose";
import { User_Role } from "./ssnUser.const";

export type TUser = {
  username: string;
  email?:string
  password: string;
  balance: number;
  orders: Types.ObjectId[]; 
  role: string; 
  transactions: string[];
  processedTxIds?: string[];
  cart: Types.ObjectId[];
  profilePicture?: string;
};


export type TUserRol = keyof typeof User_Role;

export type TUserModel = {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
} & Model<TUser>