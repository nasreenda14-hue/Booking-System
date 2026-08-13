import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    image: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    workers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Provider = mongoose.model("Provider", ProviderSchema);

export default Provider;
