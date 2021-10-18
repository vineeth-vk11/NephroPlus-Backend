const User = require("../models/userModel");
const mongoose = require("mongoose");
const Order = require("../models/orderModel");

exports.getAllAvailableDrivers = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          driver: mongoose.Types.ObjectId(req.params.driverId),
        },
      },
      {
        $group: {
          _id: "$status",
          orders: {
            $push: {
              orderId: "$orderId",
            },
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

    const order = await Order.findById(req.params.orderId);

    if (order.otp === otp) {
      order.status = "completed";
      await order.save();
      return res.status(200).json({
        status: "success",
        message: "Order Successfully completed",
        order,
      });
    }

    return res.status(200).json({
      status: "fail",
      message: "Entered otp is incorrect",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
