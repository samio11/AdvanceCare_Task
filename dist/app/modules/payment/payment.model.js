"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const payment_interface_1 = require("./payment.interface");
const paymentSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Product" },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    transactionId: { type: String },
    quantity: { type: Number, required: true },
    amount: { type: Number },
    invoiceUrl: { type: String },
    status: { type: String, enum: payment_interface_1.IPAYMENT_STATUS },
}, { versionKey: false, timestamps: true });
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
