const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const generateOtp = require('../utils/generateOtp');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.token = token;
  await user.save();
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    user,
  });
};

exports.signin = async (req, res) => {
  try {
    const phone = req.body.phone;
    const user = await User.findOne({ phone: phone });
    const otp = generateOtp(4);
    // Send OTP
    createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};


