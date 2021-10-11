const Slot = require("../models/slotModel");

exports.getAllSlotsOfADay = async (req, res) => {
  try {
    const date = req.params.date;
    const slots = await Slot.find({ date: date });
    return res.status(200).json({
      status: "success",
      slots,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addNewSlot = async (req, res) => {
  try {
    const newSlot = await Slot.create(req.body);
    return res.status(201).json({
      status: "fail",
      slot: newSlot,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.removeSlotById = async (req, res) => {
  try {
    await Slot.findByIdAndDelete(req.params.slotId);
    return res.status(200).json({
      status: "success",
      message: "Slot removed successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
