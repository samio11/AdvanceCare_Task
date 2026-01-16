"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Product Name is required"),
        price: zod_1.z.number(),
        description: zod_1.z.string(),
        stock: zod_1.z.number(),
    }),
});
