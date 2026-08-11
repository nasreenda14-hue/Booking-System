import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Provider from "../models/Provider.js";

export const createBooking = async (req, res) => {
  try {
    const {
      user,
      provider,
      service,
      address,
      phone,
      date,
      time,
    } = req.body;

    
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
      (s) =>
        s.service.toString() === service.toString()
    );

    if (!serviceOffered) {
      return res.status(400).json({
        success: false,
        message: "Provider does not offer this service",
      });
    }

   
    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    
    if (serviceExists.serviceMode === "home") {
      if (!address || address.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Address is required for home service",
        });
      }
    }

   
    const bookingDate = new Date(date);

    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking date",
      });
    }

   
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past dates",
      });
    }

    
    const count = await Booking.countDocuments({
      provider,
      date: bookingDate,
      time,
      status: { $ne: "cancelled" },
    });

  
    if (count >= providerExists.workers) {
      return res.status(400).json({
        success: false,
        message: "This time slot is full",
      });
    }

   
    const alreadyBooked = await Booking.findOne({
      user,
      provider,
      date: bookingDate,
      time,
      status: { $ne: "cancelled" },
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "You already booked this time slot",
      });
    }

  
    const newBooking = new Booking({
      user,
      provider,
      service,
      date: bookingDate,
      time,
      address:
        serviceExists.serviceMode === "home"
          ? address
          : "",
      phone,
    });

    const savedBooking = await newBooking.save();

    
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: err.message,
    });
  }
};

export const getBookingsByDate = async (req, res) => {
  try {
    const { providerId, date } = req.query;

    const bookingDate = new Date(date);

    bookingDate.setHours(0, 0, 0, 0);

    const bookings = await Booking.find({
      provider: providerId,
      date: bookingDate,
      status: { $ne: "cancelled" },
    });

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};