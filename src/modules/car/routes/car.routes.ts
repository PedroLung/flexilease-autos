import { Router } from "express";
import CarController from "../controllers/CarController";

const router = Router({ mergeParams: true });
const carController = new CarController();

router.get("/", carController.listCars);
router.post("/", carController.createCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

export default router;
