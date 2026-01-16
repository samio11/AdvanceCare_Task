"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    productImage: { type: String },
}, { versionKey: false, timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
