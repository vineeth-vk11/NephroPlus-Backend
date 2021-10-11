const express = require("express");
const slotController = require("../controllers/slotController");
const router = express.Router();

router.route("/").post(slotController.addNewSlot);

router.route("/all").get(slotController.getAllSlotsOfADay);

router.route("/remove/:slotId").delete(slotController.removeSlotById);

module.exports = router;
