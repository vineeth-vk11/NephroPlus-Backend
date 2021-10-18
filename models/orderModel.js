const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    status: {
      type: String,
    },
    totalAmount: {
      type: String,
    },
    location: {
      type: String,
    },
    addOns: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AddOn",
      },
    ],
    date: {
      type: Date,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    driver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: String,
    },
    ro_start: {
      type: Date,
      default: Date.now(),
    },
    ro_end: {
      type: Date,
      default: Date.now(),
    },
    driving_started: {
      type: Date,
      default: Date.now(),
    },
    start_km: {
      type: String,
    },
    end_km: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.virtual("ro_time_taken").get(function () {
  return ro_end - ro_start;
});

module.exports = mongoose.model("Order", orderSchema);
