import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true
    },
     service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
    date:{
    type:Date,
    required:true
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled",],
        default:"pending",
    },
},
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;