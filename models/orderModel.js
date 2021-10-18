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
      type: String,
    },
    ro_end: {
      type: String,
    },
    driving_start: {
      type: String,
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
