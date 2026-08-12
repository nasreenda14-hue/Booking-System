import express from "express"
import { createBooking, getBookingById, getBookingsByDate } from "../controllers/bookingController.js";
import {protect} from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/",protect,createBooking)
router.get("/date", protect, getBookingsByDate);
router.get("/:id", protect, getBookingById);

export default router;
