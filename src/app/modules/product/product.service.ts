import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProduct = async (query: Record<string, string>) => {
  const productQuery = new QueryBuilder(Product.find(), query);
  const productData = productQuery
    .filter()
    .search(["name", "email"])
    .sort()
    .paginate()
    .fields();
  const [data, meta] = await Promise.all([
    await productData.build(),
    await productData.getMeta(),
  ]);
  return { data, meta };
};

const getAProduct = async (productId: string) => {
  const existProduct = await Product.findById(productId);
  if (!existProduct) throw new AppError(401, "Product Not Found");
  return existProduct;
};

const updateProductInfo = async (
  productId: string,
  payload: Partial<IProduct>
) => {
  const existProduct = await Product.findById(productId);
  if (!existProduct) throw new AppError(401, "Product Not Found");
  const result = await Product.findByIdAndUpdate(existProduct?._id, payload, {
    new: true,
  });
  return result;
};
const deleteProduct = async (productId: string) => {
  const existProduct = await Product.findById(productId);
  if (!existProduct) throw new AppError(401, "Product Not Found");
  const result = await Product.findByIdAndDelete(existProduct?._id);
  return result;
};

export const productServices = {
  createProduct,
  getAllProduct,
  getAProduct,
  updateProductInfo,
  deleteProduct,
};
