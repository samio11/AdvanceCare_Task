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
exports.paymentServices = void 0;
const AppError_1 = require("../../errors/AppError");
const generateTransectionId_1 = require("../../utils/generateTransectionId");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const product_model_1 = require("../product/product.model");
const sslCommerz_services_1 = require("../sslCommerz/sslCommerz.services");
const user_model_1 = require("../user/user.model");
const payment_interface_1 = require("./payment.interface");
const payment_model_1 = require("./payment.model");
const initPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existsProduct = yield product_model_1.Product.findById(payload.product);
    if (!existsProduct)
        throw new AppError_1.AppError(401, "Product is not found");
    if (existsProduct.stock === 0)
        throw new AppError_1.AppError(401, "Product is out of stock");
    const existUser = yield user_model_1.User.findById(payload.user);
    if (!existUser)
        throw new AppError_1.AppError(401, "User is not found");
    const tans_id = (0, generateTransectionId_1.generateTransectionId)();
    const calculatedPrice = Number(payload.quantity) * Number(existsProduct.price);
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    const paymentPayload = {
        product: payload.product,
        user: payload.user,
        transactionId: tans_id,
        quantity: payload.quantity,
        amount: calculatedPrice,
        status: payment_interface_1.IPAYMENT_STATUS.UNPAID,
    };
    try {
        const createPayment = yield payment_model_1.Payment.create([paymentPayload], { session });
        yield product_model_1.Product.findByIdAndUpdate(payload.product, { $inc: { stock: -createPayment[0].quantity } }, { new: true, session });
        const sslCommerzPayload = {
            amount: (_a = createPayment[0]) === null || _a === void 0 ? void 0 : _a.amount,
            transactionId: tans_id,
            name: existUser.name,
            email: existUser.email,
            phoneNumber: existUser.phoneNumber,
        };
        const sslCommerz = yield sslCommerz_services_1.SSLService.sslPaymentInit(sslCommerzPayload);
        // console.log(sslCommerz);
        yield session.commitTransaction();
        session.endSession();
        return {
            payment_url: sslCommerz.GatewayPageURL,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const successPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const updatepayment = yield payment_model_1.Payment.findOneAndUpdate({ transactionId: query === null || query === void 0 ? void 0 : query.transactionId }, // Changed from transection_id
        { status: payment_interface_1.IPAYMENT_STATUS.PAID }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment Created Done",
            success: true,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const failPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const updatepayment = yield payment_model_1.Payment.findOneAndUpdate({ transactionId: query === null || query === void 0 ? void 0 : query.transactionId }, // Changed from transection_id
        { status: payment_interface_1.IPAYMENT_STATUS.FAILED }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment Failed",
            success: true,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const cancelPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const updatepayment = yield payment_model_1.Payment.findOneAndUpdate({ transactionId: query === null || query === void 0 ? void 0 : query.transactionId }, // Changed from transection_id
        { status: payment_interface_1.IPAYMENT_STATUS.CANCELLED }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return {
            message: "Payment Canceled",
            success: true,
        };
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const getAllPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.QueryBuilder(payment_model_1.Payment.find(), query);
    const productData = productQuery.filter().sort().paginate().fields();
    const [data, meta] = yield Promise.all([
        yield productData.build(),
        yield productData.getMeta(),
    ]);
    return { data, meta };
});
exports.paymentServices = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    getAllPayment,
};
