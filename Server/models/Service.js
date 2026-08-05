import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;