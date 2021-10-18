const express = require("express");
const driverController = require("../controllers/driverController");
const router = express.Router();

router
  .route("/orders/all/:driverId")
  .get(driverController.getAllAvailableDrivers);

router.route("/ro/details/:orderId").post(driverController.updateRoDetails);

router
  .route("/km/details/:orderId")
  .post(driverController.updateDrivingKMDetails);

router.route("/confirm/otp/:orderId").post(driverController.confirmedOrderOTP);

module.exports = router;
