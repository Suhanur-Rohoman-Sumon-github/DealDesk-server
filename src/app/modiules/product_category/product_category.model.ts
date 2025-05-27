import { model, Schema } from "mongoose";
import { TProductCategory } from "./product_category.interface";
import slugify from "slugify"; // <- install slugify package

const CategorySchema = new Schema<TProductCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    }
  },
  { timestamps: true }
);

// Before saving, automatically generate slug
CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const CategoryModel = model<TProductCategory>("Category", CategorySchema);
