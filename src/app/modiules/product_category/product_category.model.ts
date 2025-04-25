import { model, Schema } from "mongoose";
import { TProductCategory } from "./product_category.interface";

const CategorySchema = new Schema<TProductCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, 
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model<TProductCategory>("Category", CategorySchema);