import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
