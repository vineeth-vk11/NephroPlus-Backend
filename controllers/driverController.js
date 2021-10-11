const User = require("../models/userModel");

exports.getAllAvailableDrivers = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      staus: "fail",
      message: err,
    });
  }
};

exports.roWaterFill = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    // const
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
