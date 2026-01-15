import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { productServices } from "./product.service";

const createProduct = catchAsync(async (req, res, next) => {
  const payload = {
    ...req?.body,
    productImage: req?.file?.path,
  };
  const result = await productServices.createProduct(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product Created Done!!!",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await productServices.getAllProduct(
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    message: "Product Getted Done",
    statusCode: 200,
    data: result,
  });
});
const getAProduct = catchAsync(async (req, res, next) => {
  const { productId } = req?.params;
  const result = await productServices.getAProduct(productId as string);
  sendResponse(res, {
    success: true,
    message: "Product Getted Done",
    statusCode: 200,
    data: result,
  });
});
const updateAProduct = catchAsync(async (req, res, next) => {
  const { productId } = req?.params;
  const payload = req?.body;
  const result = await productServices.updateProductInfo(
    productId as string,
    payload
  );
  sendResponse(res, {
    success: true,
    message: "Product Updated Done",
    statusCode: 200,
    data: result,
  });
});
const deleteAProduct = catchAsync(async (req, res, next) => {
  const { productId } = req?.params;
  const result = await productServices.deleteProduct(productId as string);
  sendResponse(res, {
    success: true,
    message: "Product Deleted Done",
    statusCode: 200,
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};
