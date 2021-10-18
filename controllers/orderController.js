const mongoose = require("mongoose");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");

exports.getAllOrdersOfAUser = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.params.id),
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
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNewOrder = async (req, res) => {
  try {
    const { addOns, totalAmount, userId } = req.body;
    const orderId = uuidv4();
    const newOrder = await Order.create({
      addOns: addOns,
      orderId: orderId,
      totalAmount: totalAmount,
      user: userId,
    });

    return res.status(201).json({
      status: "success",
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// new / approved/rejected
exports.getAllOrdersForQM = async (req, res) => {
  try {
    const qm = await User.findOne(req.params.qmId);
    const orders = await Order.aggregate([
      {
        $match: {
          state: qm.state,
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
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllOrdersForCM = async (req, res) => {
  try {
    const cm = await User.findOne(req.params.cmId);
    const orders = await Order.aggregate([
      {
        $match: {
          state: cm.state,
        },
      },
      {
        $match: {
          status: "accepted_by_qm",
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
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.assignDrivers = async (req, res) => {
  try {
    const order = await Order.findOne(req.body.orderId);
    order.driver = req.body.driverId;
    await order.save();
    return res.status(200).json({
      status: "success",
      order,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
