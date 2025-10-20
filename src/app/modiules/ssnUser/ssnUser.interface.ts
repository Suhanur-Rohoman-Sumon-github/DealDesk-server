import { Model, Types } from "mongoose";

export type TUser = {
  username: string;
  password: string;
  balance: number;
  orders: Types.ObjectId[]; 
  role: string; 
  processedTxIds?: string[];
  cart: Types.ObjectId[];
};


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