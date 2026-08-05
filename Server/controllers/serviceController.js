import Service from "../models/Service.js";

export const createService=async (req,res)=>{
  try {
    const { name,category } = req.body;

  
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required",
      });
    }
    const exists = await Service.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Service already exists",
      });
    }
const service = await Service.create({ name,category });

    res.status(201).json({
      success: true,
      message: "Service created",
      service,
    });

}catch(err){
    res.status(500).json({
      success: false,
      message: err.message,
    });
    }
}

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

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