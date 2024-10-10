const express = require("express");

const adoptPet = require("../controllers/adoptController");
const { authenticateToken } = require("../../shared/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, adoptPet);

module.exports = router;
