import { Router } from "express";
import { userController } from "./user.controller";
import { IRole } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth([IRole.admin]), userController.getAllUser);
router.get(
  "/get-single",
  checkAuth([...Object.values(IRole)]),
  userController.getAUser
);
router.put(
  "/update",
  checkAuth([...Object.values(IRole)]),
  userController.updateUser
);

router.post(
  "/block/:userId",
  checkAuth([IRole.admin]),
  userController.blockUser
);
router.post(
  "/un-block/:userId",
  checkAuth([IRole.admin]),
  userController.unBlockUser
);

export const userRoutes = router;
