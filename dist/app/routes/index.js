"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoute = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const product_routes_1 = require("../modules/product/product.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
exports.rootRoute = (0, express_1.Router)();
const moduleRoute = [
    {
        path: "/auth",
        element: auth_routes_1.authRoutes,
    },
    {
        path: "/user",
        element: user_routes_1.userRoutes,
    },
    {
        path: "/product",
        element: product_routes_1.productRouter,
    },
    {
        path: "/payment",
        element: payment_routes_1.paymentRoutes,
    },
];
moduleRoute.forEach((x) => exports.rootRoute.use(x.path, x.element));
