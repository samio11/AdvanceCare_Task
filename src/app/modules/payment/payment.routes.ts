import { Router } from "express";
import { paymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";

const routes = Router();

routes.post(
  "/create",
  checkAuth([IRole.customer]),
  paymentController.initPayment
);
routes.post("/success", paymentController.successfulPayment);
routes.post("/fail", paymentController.failPayment);
routes.post("/cancel", paymentController.canceledPayment);

export const paymentRoutes = routes;
