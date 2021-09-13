const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);
