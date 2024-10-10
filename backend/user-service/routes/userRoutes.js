const express = require("express");

const {
  createUser,
  verifyUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/new", createUser);
router.post("/verify", verifyUser);
// router.delete("/delete", deleteUser);

module.exports = router;
