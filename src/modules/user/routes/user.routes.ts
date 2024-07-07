import { Router } from "express";
import UserController from "../controller/UserController";
import authMiddleware from "../../../middlewares/auth";

const router = Router({
  mergeParams: true,
});
const userController = new UserController();

router.post("/", userController.createUser);

router.use(authMiddleware);
router.get("/", userController.listUsers);
router.get("/:id", userController.searchUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
