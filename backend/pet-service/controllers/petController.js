const Pet = require("../models/petModel");

exports.addNewPet = async (req, res) => {
  const { name, type, age } = req.body;

  try {
    await Pet.addPet(name, type, age);
    res.status(201).json({ message: "Pet added." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add pet." });
  }
};

exports.getAvailablePets = async (req, res) => {
  try {
    const pets = Pet.getPets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all available pets." });
  }
};

exports.updatePetName = async (req, res) => {
  const { newName, name } = req.body;
  try {
    await Pet.updatePet(newName, name);
    res.status(201).json({ message: "Updated pet name." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update pet name." });
  }
};

exports.updatePetStatus = async (req, res) => {
  try {
    Pet.updatePetStatus();
    res.status(201).json({ message: "Updated pet status." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update pet status." });
  }
};
