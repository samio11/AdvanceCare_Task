import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";

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
];

moduleRoute.forEach((x) => rootRoute.use(x.path, x.element));
