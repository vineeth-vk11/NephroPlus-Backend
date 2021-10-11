const AddOn = require("../models/addOnModel");

exports.getAllAddOns = async (req, res) => {
  try {
    const addOns = await AddOn.find();
    return res.status(200).json({
      status: "success",
      addOns,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAddOnById = async (req, res) => {
  try {
    const addOns = await AddOn.findById(req.params.addOnId);
    return res.status(200).json({
      status: "success",
      addOns,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNewAddOn = async (req, res) => {
  try {
    const newAddOn = await AddOn.create(req.body);
    return res.status(201).json({
      status: "success",
      addOn: newAddOn,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAddOnById = async (req, res) => {
  try {
    const updatedAddOn = await AddOn.findByIdAndUpdate(
      req.params.addOnId,
      req.body,
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      updatedAddOn,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAddOnById = async (req, res) => {
  try {
    await AddOn.findByIdAndDelete(req.params.addOnId);
    return res.status(200).json({
      status: "success",
      message: "Add On deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
