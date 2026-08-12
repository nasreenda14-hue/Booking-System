import express from "express";
import { createProvider, getProviderById, getProviders } from "../controllers/providerController.js";
import {protect,authorizeRoles} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/",protect, authorizeRoles("provider"), createProvider);
router.get("/", getProviders);
router.get("/:id", getProviderById);

export default router;