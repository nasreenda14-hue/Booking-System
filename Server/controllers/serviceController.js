import Service from "../models/Service.js";

export const createService = async (req, res) => {
  try {
    const { name, category, description, image, serviceMode } = req.body;

    if (!name || !category || !serviceMode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const exists = await Service.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Service already exists",
      });
    }
    const service = await Service.create({
      name,
      category,
      description,
      image,
      serviceMode,
    });

    res.status(201).json({
      success: true,
      message: "Service created",
      service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getServices = async (req, res) => {
  try {
    const { category, serviceMode } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (serviceMode) {
      query.serviceMode = serviceMode;
    }

    const services = await Service.find(query);

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { name, category, description, image, serviceMode } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        description,
        image,
        serviceMode,
      },
      { new: true },
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
