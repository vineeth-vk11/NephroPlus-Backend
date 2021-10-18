const User = require("../models/userModel");

exports.getAllAvailableDrivers = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          driver: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: {
            status: "$status",
          },
        },
      },
    ]);
    return res.status(200).json({
      status: "success",
      orders,
    });
  } catch (err) {
    res.status(400).json({
      staus: "fail",
      message: err,
    });
  }
};

exports.updateRoDetails = async (req, res) => {
  try {
    const data = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      data,
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateDrivingKMDetails = async (req, res) => {
  try {
    const data = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      data,
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.confirmedOrderOTP = async (req, res) => {
  try {
    const otp = req.body.otp;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        otp: otp,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
