const express = require("express");

const adoptController = require("../controllers/adoptController");
const { authenticateToken } = require("../../shared/middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, adoptController.adoptPet);

module.exports = router;
