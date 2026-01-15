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

const getAProduct = async (userId: string) => {
  const existProduct = await Product.findById(userId);
  if (!existProduct) throw new AppError(401, "Product Not Found");
  return existProduct;
};

export const productServices = { createProduct, getAllProduct, getAProduct };
