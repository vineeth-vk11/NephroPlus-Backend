const User = require("../models/userModel");

exports.updateUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

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
