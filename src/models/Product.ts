import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  productID: string;
  brand: string;
  availability: boolean;
  price: number;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    productID: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    availability: { type: Boolean, default: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
