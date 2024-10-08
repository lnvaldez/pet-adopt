const express = require("express");

const {
  addNewPet,
  getAvailablePets,
  updatePetName,
  updatePetStatus,
  deletePet,
} = require("../controllers/petController");
