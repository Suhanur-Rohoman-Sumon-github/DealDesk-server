import mongoose from 'mongoose';

import bcryptjs from 'bcryptjs';
import { TUser, TUserModel } from './user.interface';


const userSchema = new mongoose.Schema<TUser>(
  {
    username: { type: String },
    telegram: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, },
    profilePicture: {
      type: String,
      default: 'https://i.ibb.co.com/K2D8vpy/download.png',
    },
    coverPhoto: { type: String },
    myFavorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
    id: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin','employer','client'],
      default: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    cryptoWallets: {
      BTC: { type: String },
      LTC: { type: String },
      TRC20: { type: String },
    },
    myChanel: { type: String },
    isEmailVerified:{type:Boolean,default:false},
    isActive:{type:Boolean,default:false},
    emailVerificationCode: { type: String },
    isAccountAproved: { type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'},
    
  },
 
  {
    timestamps: true,
  },
);

userSchema.pre<TUser>('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
 
    const salt = await bcryptjs.genSalt(10); 
    this.password = await bcryptjs.hash(this.password, salt);
  
  next(); // Call the next middleware
});

// Add the static methods to the userSchema
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Export the model with the correct type
export const userModel = mongoose.model<TUser, TUserModel>('User', userSchema);


// models/jabedaModel.ts


const jabedaSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  type: { type: String, enum: ["Credit", "Debit"], required: true },
  description: String,
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

jabedaSchema.index({ orderId: 1, type: 1 }, { unique: true }); // optional safety

export const JabedaModel = mongoose.model("Jabeda", jabedaSchema);

