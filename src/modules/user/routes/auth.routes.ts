import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router({
  mergeParams: true,
});
const authController = new AuthController();

router.post("/", authController.createAuth);

export default router;
