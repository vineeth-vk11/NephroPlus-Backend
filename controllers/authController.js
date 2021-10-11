const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Otp = require("../models/otpModel");
const generateOtp = require("../utils/generateOtp");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, userId, statusCode, req, res) => {
  const token = signToken(userId);
  // console.log(token, "token");
  // user.token = token;
  // await user.save();
  // user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    user,
    token,
  });
};

exports.signin = async (req, res) => {
  try {
    const mobileNumber = req.body.phone;
    const otpValue = generateOtp.generateOtp(4);

    let otp = await Otp.findOne({ otpFor: mobileNumber });
    if (!otp) {
      otp = new Otp({
        otpValue: otpValue,
        otpExpiration: 5,
        otpFor: mobileNumber,
      });
      await otp.save();
    } else {
      otp.otpValue = otpValue;
      otp.otpExpiration = 5;
      await otp.save();
    }

    // Send OTP

    res.status(200).json({
      status: "success",
      data: otp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const mobileNumber = req.body.phone;
    const otpValue = req.body.otp;

    let otp = await Otp.findOne({ otpFor: mobileNumber, otpValue: otpValue });

    if (!otp) {
      return res.status(400).json({
        status: "fail",
        message: "No otp found",
      });
    }

    let updatedAt = new Date(otp.updatedAt);
    let expiresIn = new Date(
      updatedAt.setMinutes(updatedAt.getMinutes() + otp.otpExpiration)
    );

    if (new Date() < expiresIn) {
      let user = await User.findOne({ mobileNumber: mobileNumber });
      await otp.remove();

      if (!user) {
        userIdCustom = new mongoose.Types.ObjectId();

        const newUser = await User.create({
          _id: userIdCustom,
          mobileNumber: mobileNumber,
          token: "",
        });

        createSendToken(newUser, userIdCustom, 201, req, res);
      }

      createSendToken(user, user._id, 201, req, res);
    } else {
      return res.status(400).json({
        status: "fail",
        message: "OTP has been expired",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.isAvailable = async (req, res) => {
  try {
    mobileNumber = req.body.phone;
    const user = await User.findOne({ phone: mobileNumber });

    if (!user) {
      return res.status(200).json({
        status: "success",
        isAvailable: false,
      });
    }

    return res.status(200).json({
      status: "success",
      isAvailable: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
