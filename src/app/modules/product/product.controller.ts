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

export const productController = { createProduct };
