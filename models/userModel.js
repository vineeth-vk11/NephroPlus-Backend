const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    photo: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "qm", "cm", "driver"],
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
