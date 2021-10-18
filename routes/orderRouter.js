const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.route("/new").post(orderController.createNewOrder);

module.exports = router;
