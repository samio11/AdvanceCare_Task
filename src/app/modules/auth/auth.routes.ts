import { Router } from "express";
import { authController } from "./auth.controller";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "./auth.validation";
import { multerUpload } from "../../config/multer.config";
import { parseFormData } from "../../middlewares/parseFormData";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  authController.userLogin
);
router.post(
  "/register",
  multerUpload.single("file"),
  parseFormData,
  validateRequest(registerValidationSchema),
  authController.userRegister
);
router.post("/logout", authController.userLogout);

export const authRoutes = router;
