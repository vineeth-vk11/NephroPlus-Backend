const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/:userId").post(userController.updateUserData);

module.exports = router;
