const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.route("/all/:userId").get(orderController.getAllOrdersOfAUser);

router.route("/new").post(orderController.createNewOrder);

module.exports = router;
