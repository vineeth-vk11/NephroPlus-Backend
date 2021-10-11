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
    addOnes: [
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
