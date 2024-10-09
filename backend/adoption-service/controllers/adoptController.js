const Adopt = require("../models/adoptModel");

exports.adoptPet = async (req, res) => {
  const { petId, adopterId } = req.body;

  try {
    await Adopt.adoptPet(petId, adopterId);
    res.status(201).json({ message: "Adoption succesful." });
  } catch (error) {
    res.status(500).json({ error: "Failed to adopt a pet." });
  }
};
