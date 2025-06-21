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
  isActive: boolean
  address?: string;
  phone?: string;
  currentState?: 'pro' | 'free';
  followers?: string[];
  following?: string[];
  friends?: string[];
  __v?: number;
  isTwoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  twoFactorAuthCode?: string;
  twoFactorAuthCodeExpires?: Date;
  twoFactorAuthVerified?: boolean;
  twoFactorAuthVerifiedAt?: Date;
  twoFactorAuthVerifiedBy?: string;
  twoFactorAuthVerifiedById?: Types.ObjectId;
  paymentMethod?: string[]; 
  cryptoWallets?: {
    BTC?: string;
    LTC?: string;
    TRC20?: string;
  };
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