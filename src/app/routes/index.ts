import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

export const rootRoute = Router();

const moduleRoute = [
  {
    path: "/auth",
    element: authRoutes,
  },
];

moduleRoute.forEach((x) => rootRoute.use(x.path, x.element));
