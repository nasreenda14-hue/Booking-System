import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Stripe from "stripe";
import Booking from "../models/Booking.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log(
  "Payment controller Stripe key:",
  Boolean(process.env.STRIPE_SECRET_KEY)
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
  return res.status(400).json({
    success: false,
    message: "Booking ID is required",
  });
}

const booking = await Booking.findById(bookingId);

if (!booking) {
  return res.status(404).json({
    success: false,
    message: "Booking not found",
  });
}
if (booking.user.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    message: "You cannot pay for this booking",
  });
}
if (booking.paymentStatus === "paid") {
  return res.status(400).json({
    success: false,
    message: "Booking is already paid",
  });
}

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],

  line_items: [
    {
      price_data: {
        currency: "aed",

        product_data: {
          name: "Easy Book Service",
        },

        unit_amount: booking.price * 100,
      },

      quantity: 1,
    },
  ],

  mode: "payment",

  success_url:
    "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",

  cancel_url:
    "http://localhost:5173/payment-cancelled",

  metadata: {
    bookingId: booking._id.toString(),
  },
});
res.status(200).json({
  success: true,
  url: session.url,
});
  } catch (error) {
     console.error( "Payment error:", error ); 
     res.status(500).json({ 
        success: false, message: "Payment creation failed", 
        error: error.message, });
     }
     };