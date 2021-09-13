const User = require("../models/userModel");

exports.updateUserData = async (req, res) => {
  try {
    const mobileNumber = req.body.phone;
    const user = await User.findOne({ phone: mobileNumber });

    if (!user) {
      return res.status(400).json({});
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
