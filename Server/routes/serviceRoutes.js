import express from "express";
import { createService, getServices,updateService,deleteService, getRecentServices } from "../controllers/serviceController.js";
import {protect,authorizeRoles} from "../middleware/authMiddleware.js"


const router = express.Router();

router.post("/create", protect, authorizeRoles("admin"), createService);
router.get("/", getServices);
router.get("/recent", getRecentServices);
router.put("/:id",protect, authorizeRoles("admin"), updateService);
router.delete("/:id",protect, authorizeRoles("admin"), deleteService);

export default router;