import mongoose from "mongoose";
import Provider from "../models/Provider.js";
import Service from "../models/Service.js";


export const createProvider = async (req, res) => {
  try {
    const { name, category, services, image, location, workers } = req.body;

    if (!name || !services || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and services are required",
      });
    }

    
    const serviceIds = services.map((s) => s.service);

  
    const validServices = await Service.find({
      _id: { $in: serviceIds },
    });

    if (validServices.length !== services.length) {
      return res.status(400).json({
        success: false,
        message: "One or more services are invalid",
      });
    }

   
    const provider = await Provider.create({
      name,
      category,
      services, 
      image,
      location,
      workers,
    });

    res.status(201).json({
      success: true,
      message: "Provider created",
      provider,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const getProviders = async (req, res) => {
  try {
    const { service } = req.query;

    let query = {};

    if (service) {
      query = {
        "services.service": new mongoose.Types.ObjectId(service)
      };
    }

    const providers = await Provider.find(query)
      .populate("services.service");

    res.status(200).json({
      success: true,
      providers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};