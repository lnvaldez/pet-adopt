const express = require("express");

const {
  addNewPet,
  getAvailablePets,
  updatePetName,
  updatePetStatus,
  deletePet,
} = require("../controllers/petController");

const router = express.Router();

router.post("/", addNewPet);
router.get("/available", getAvailablePets);
router.put("/", updatePetName);
router.put("/status", updatePetStatus);
router.delete("/", deletePet);

module.exports = router;
