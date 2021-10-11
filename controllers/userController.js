const User = require("../models/userModel");

exports.updateUserData = async (req, res) => {
  try {
    const mobileNumber = req.body.phone;
    const user = await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(400).json({});
    }
    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
