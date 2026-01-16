"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.QueryBuilder(product_model_1.Product.find(), query);
    const productData = productQuery
        .filter()
        .search(["name", "email"])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        yield productData.build(),
        yield productData.getMeta(),
    ]);
    return { data, meta };
});
const getAProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield product_model_1.Product.findById(productId);
    if (!existProduct)
        throw new AppError_1.AppError(401, "Product Not Found");
    return existProduct;
});
const updateProductInfo = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield product_model_1.Product.findById(productId);
    if (!existProduct)
        throw new AppError_1.AppError(401, "Product Not Found");
    const result = yield product_model_1.Product.findByIdAndUpdate(existProduct === null || existProduct === void 0 ? void 0 : existProduct._id, payload, {
        new: true,
    });
    return result;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield product_model_1.Product.findById(productId);
    if (!existProduct)
        throw new AppError_1.AppError(401, "Product Not Found");
    const result = yield product_model_1.Product.findByIdAndDelete(existProduct === null || existProduct === void 0 ? void 0 : existProduct._id);
    return result;
});
exports.productServices = {
    createProduct,
    getAllProduct,
    getAProduct,
    updateProductInfo,
    deleteProduct,
};
