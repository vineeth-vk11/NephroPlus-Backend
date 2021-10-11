const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    slotInfo: [
      {
        time: String,
        isAvailable: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);

// 2 tables
// when expires we'll delete from one table
