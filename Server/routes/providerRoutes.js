import express from "express";
import { createProvider, getProviders } from "../controllers/providerController.js";
import {protect,authorizeRoles} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/",protect, authorizeRoles("provider","admin"), createProvider);
router.get("/", getProviders);

export default router;