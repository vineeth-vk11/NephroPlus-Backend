const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("OTP", otpSchema)