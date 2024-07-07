import { Router } from "express";
import carRoutes from "../../../modules/car/routes/car.routes";
import userRoutes from "../../../modules/user/routes/user.routes";
import reserveRoutes from "../../../modules/reserves/routes/reserve.routes";
import authRoutes from "../../../modules/user/routes/auth.routes";
import authMiddleware from "../../../middlewares/auth";

const routes = Router({
  mergeParams: true,
});

routes.use("/user", userRoutes);
routes.use("/authenticate", authRoutes);

routes.use(authMiddleware);

routes.use("/car", carRoutes);
routes.use("/reserve", reserveRoutes);

export default routes;
