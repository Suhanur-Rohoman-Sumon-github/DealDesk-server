import { Model, Types } from 'mongoose';
import { User_Role, USER_STATUS } from './user.constant';


export type TUser = {
  _id?: Types.ObjectId; 
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
  coverPhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: string;
  isDeleted: boolean;
  myFavorite: Types.ObjectId[]; 
  status: keyof typeof USER_STATUS;
  telegram: string;
  myChanel: string;
  passwordChangedAt?: Date;
  isEmailVerified: boolean;
  emailVerificationCode: string |null;
  isAccountAproved: string;
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


export type PieSlice = {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
}

export type GraphPoint = {
  date: string;
  amount: number;
  orders: number;
}

export type JabedaEntry = {
  type: "Credit" | "Debit";
  description: string;
  amount: number;
  date: string;
}

export type TUserRol = keyof typeof User_Role;