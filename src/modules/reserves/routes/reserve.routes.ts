import { Router } from "express";
import ReserveController from "../controller/ReserveController";

const router = Router({ mergeParams: true });
const reserveController = new ReserveController();

router.get("/", reserveController.listReserve);
router.get("/:id", reserveController.searchReserve);
router.post("/", reserveController.createReserve);
router.put("/:id", reserveController.updateReserve);
router.delete("/:id", reserveController.deleteReserve);

export default router;
