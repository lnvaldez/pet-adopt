const express = require("express");

const adoptPet = require("../controllers/adoptController");

const router = express.Router();

router.post("/", adoptPet);

module.exports = router;
