import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Provider from "../models/Provider.js";
import Category from "../models/Category.js";

export const createBooking=async (req,res)=>{
    try{
        const { user, provider, service,address,phone, date, time } = req.body;

        const serviceExists = await Service.findById(service);
    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const providerExists = await Provider.findById(provider);
    if (!providerExists) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

     const serviceOffered = providerExists.services.some(
  (s) => s.service.toString() === service.toString()
);

if (!serviceOffered) {
  return res.status(400).json({
    success: false,
    message: "Provider does not offer this service",
  });
}



    const bookingDate = new Date(date);
    const today = new Date();

    if (bookingDate < today.setHours(0,0,0,0)) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past dates",
      });
    }
      
    if (phone.length !== 10) {
  return res.status(400).json({
    message: "Invalid phone number",
  });
}
    const existingBooking = await Booking.findOne({
      provider,
      date: bookingDate,
      address,
      phone,
      time,
      status: { $ne: "cancelled" },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked",
      });
    }
    const count = await Booking.countDocuments({
  provider,
  date: bookingDate,
  time,
  address,
  phone,
  status: { $ne: "cancelled" },
});

if (count >= 3) {
  return res.status(400).json({
    message: "Slot is full",
  });
}

    const alreadyBooked = await Booking.findOne({
  user,
  provider,
  date: bookingDate,
  time,
  address,
  phone,
});

if (alreadyBooked) {
  return res.status(400).json({
    message: "You already booked this slot",
  });
}
      const newBooking = new Booking({
      user,
      provider,
      service,
      date: bookingDate,
      time,
      address,
      phone,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });
    }catch(err){
         res.status(500).json({
      success: false,
      message: "Booking failed",
      error: err.message,
    });
    }
}

