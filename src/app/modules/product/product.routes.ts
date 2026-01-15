import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { IRole } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { parseFormData } from "../../middlewares/parseFormData";
import validateRequest from "../../middlewares/validateRequest";
import { productValidationSchema } from "./product.validation";
import { productController } from "./product.controller";

const router = Router();

router.post(
  "/create-product",
  checkAuth([IRole.admin]),
  multerUpload.single("file"),
  parseFormData,
  validateRequest(productValidationSchema),
  productController.createProduct
);

router.get("/", productController.getAllProduct);
router.get("/single/:productId", productController.getAProduct);

router.put(
  "/update/:productId",
  checkAuth([IRole.admin]),
  productController.updateAProduct
);
router.delete(
  "/delete/:productId",
  checkAuth([IRole.admin]),
  productController.deleteAProduct
);

export const productRouter = router;
