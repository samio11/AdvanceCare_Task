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
exports.productController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { productImage: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path });
    const result = yield product_service_1.productServices.createProduct(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Product Created Done!!!",
        data: result,
    });
}));
const getAllProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield product_service_1.productServices.getAllProduct(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product Getted Done",
        statusCode: 200,
        data: result,
    });
}));
const getAProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield product_service_1.productServices.getAProduct(productId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product Getted Done",
        statusCode: 200,
        data: result,
    });
}));
const updateAProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req === null || req === void 0 ? void 0 : req.params;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield product_service_1.productServices.updateProductInfo(productId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product Updated Done",
        statusCode: 200,
        data: result,
    });
}));
const deleteAProduct = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield product_service_1.productServices.deleteProduct(productId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Product Deleted Done",
        statusCode: 200,
        data: result,
    });
}));
exports.productController = {
    createProduct,
    getAllProduct,
    getAProduct,
    updateAProduct,
    deleteAProduct,
};
