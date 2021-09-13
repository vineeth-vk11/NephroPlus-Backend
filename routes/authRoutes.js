const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signin").post(authController.signin);

router.route("/otp/verify").post(authController.verifyOTP)

module.exports = router;
