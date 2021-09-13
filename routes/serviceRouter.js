const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();

router.route("/all").get(serviceController.getAllServices);

router.route("/single/:serviceId").get(serviceController.getServiceById);

router.route("/single/:serviceId").put(serviceController.updateServiceById);

router
  .route("/single/delete/:serviceId")
  .post(serviceController.deleteServiceById);

module.exports = router;
