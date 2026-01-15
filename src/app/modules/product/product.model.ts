import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    productImage: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
