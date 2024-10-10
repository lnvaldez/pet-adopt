const express = require("express");

const { createUser, verifyUser } = require("../controllers/userController");

const router = express.Router();

router.post("/new", createUser);
router.post("/verify", verifyUser);

module.exports = router;
