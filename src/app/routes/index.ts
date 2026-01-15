import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";

export const rootRoute = Router();

const moduleRoute = [
  {
    path: "/auth",
    element: authRoutes,
  },
  {
    path: "/user",
    element: userRoutes,
  },
  {
    path: "/product",
    element: productRouter,
  },
];

moduleRoute.forEach((x) => rootRoute.use(x.path, x.element));
