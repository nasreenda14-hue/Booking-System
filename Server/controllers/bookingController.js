import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Provider from "../models/Provider.js";

export const createBooking = async (req, res) => {
  try {
    const {
      provider,
      service,
      address,
      phone,
      date,
      time,
    } = req.body;

     const user = req.user.id;

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

    
    const providerService = providerExists.services.find(
      (s) =>
        s.service.toString() === service.toString()
    );

    if (!providerService) {
      return res.status(400).json({
        success: false,
        message: "Provider does not offer this service",
      });
    }

     const price = providerService.price; 
    if (!price || price <= 0) {
       return res.status(400).json({
         success: false, 
         message: "Invalid service price", 
        });
       }


   
    if (!phone || phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

   
    if (serviceExists.serviceMode === "Home") {
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
bookingDate.setHours(0, 0, 0, 0);
   
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    

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
        serviceExists.serviceMode === "Home"
          ? address
          : "",
      phone,
      price,
      paymentStatus: "pending",
      status: "pending",
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

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("provider", "name location")
      .populate("service", "name");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};