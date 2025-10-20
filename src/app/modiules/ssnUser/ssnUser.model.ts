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
   cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "SSN",
      }
    ],
    processedTxIds: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // ✅ skip if not modified
//   const salt = await bcryptjs.genSalt(10);
//   this.password = await bcryptjs.hash(this.password, salt);
//   next();
// });


// Add the static methods to the userSchema
userSchema.statics.isUserExistsByUsername = async function (username: string) {
  return await this.findOne({ username }).select('+password');
};


userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

export const ssnUserModel = model<TUser>("SsnUser", userSchema);
