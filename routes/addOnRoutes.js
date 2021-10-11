const express = require("express");
const addOnController = require("../controllers/addOnController");
const router = express.Router();

router.route("/").post(addOnController.createNewAddOn);

router.route("/all").get(addOnController.getAllAddOns);

router.route("/single/:addOnId").get(addOnController.getAddOnById);

router.route("/update/:addOnId").post(addOnController.updateAddOnById);

router.route("/delete/:addOnId").delete(addOnController.deleteAddOnById);

module.exports = router;
