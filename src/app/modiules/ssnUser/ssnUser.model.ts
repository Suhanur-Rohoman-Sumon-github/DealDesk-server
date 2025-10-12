import { Schema, model } from "mongoose";
import { TUser } from "./ssnUser.interface";
import bcryptjs from 'bcryptjs';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "SSN", 
      },
    ],
  },
  {
    timestamps: true,
  }
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

export const ssnUserModel = model<TUser>("SsnUser", userSchema);
