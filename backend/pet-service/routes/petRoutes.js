const express = require("express");
const {
  addNewPet,
  getAvailablePets,
  updatePetName,
  deletePet,
} = require("../controllers/petController");
const { authenticateToken } = require("../../shared/middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, addNewPet);
router.get("/available", getAvailablePets);
router.put("/", authenticateToken, updatePetName);
router.delete("/", authenticateToken, deletePet);

module.exports = router;
