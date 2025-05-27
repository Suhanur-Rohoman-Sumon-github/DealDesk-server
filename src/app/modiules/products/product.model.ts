// models/Product.ts
import mongoose, { Schema } from 'mongoose';
import { TProduct } from './products.interface';



const ProductSchema: Schema = new mongoose.Schema<TProduct>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sellprice: { type: Number, default: 0 }, 
    category: { type: String, required: true },
    images: [{ type: String, required: true }],
    stock: { type: Number, default: 0 },
    rating: [{ type: String, default: 5 }],
    buyPrice: { type: Number, default: 0 }, 
    tags: [{ type: String }],
    numReviews  : { type: Number, default: 5 },
    shippingAndReturns: { type: String, default: 'If you have any problem to get our service contact our customer support we are ready to support you' }, 
    status:{type:String , default:"inStock"} , 
    subCategory:{ type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<TProduct>('Product', ProductSchema);
