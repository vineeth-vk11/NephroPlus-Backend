const Service = require("../models/serviceModel");

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isDeleted: false });
    return res.status(200).json({
      status: "success",
      services,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({
      _id: req.params.serviceId,
      isDeleted: false,
    });
    if (!service) {
      return res.status(400).json({
        status: "fail",
        message: "No services found with that service id",
      });
    }
    return res.status(200).json({
      status: "success",
      service,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    return res.status(201).json({
      status: "success",
      service: newService,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateServiceById = async (req, res) => {
  try {
    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.serviceId, isDeleted: false },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(400).json({
        status: "fail",
        message: "No service found with the provided id",
      });
    }

    return res.status(200).json({
      status: "success",
      service: updatedService,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteServiceById = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {
        _id: req.params.serviceId,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
    if (!service) {
      return res.status(400).json({
        status: "fail",
        message: "No service found with the provided service Id",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
