const express = require("express");

const {
  addNewPet,
  getAvailablePets,
  updatePetName,
  updatePetStatus,
  deletePet,
} = require("../controllers/petController");

const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateToken, addNewPet);
router.get("/available", authenticateToken, getAvailablePets);
router.put("/", authenticateToken, updatePetName);
router.put("/status", authenticateToken, updatePetStatus);
router.delete("/", authenticateToken, deletePet);

module.exports = router;
