const Pet = require("../models/petModel");

exports.addNewPet = async (req, res) => {
  const { name, type, age } = req.body;

  try {
    await Pet.addPet(name, type, age);
    res.status(201).json({ message: "Pet added." });
    console.log(`New pet added: name=${name}, type=${type}, age=${age}`);
  } catch (error) {
    console.error("Error adding pet:", error.message);
    res.status(500).json({ error: "Failed to add pet." });
  }
};

exports.getAvailablePets = async (req, res) => {
  try {
    const pets = await Pet.getPets();
    res.json(pets);
    console.log("Fetched available pets.");
  } catch (error) {
    console.error("Error fetching available pets:", error.message);
    res.status(500).json({ error: "Failed to get available pets." });
  }
};

exports.updatePetName = async (req, res) => {
  const { newName, name } = req.body;

  try {
    await Pet.updatePet(newName, name);
    res.status(201).json({ message: "Pet name updated." });
    console.log(`Updated pet name: oldName=${name}, newName=${newName}`);
  } catch (error) {
    console.error("Error updating pet name:", error.message);
    res.status(500).json({ error: "Failed to update pet name." });
  }
};

exports.deletePet = async (req, res) => {
  const { name } = req.body;

  try {
    await Pet.deletePet(name);
    res.status(204).json({ message: "Pet deleted from database." });
    console.log(`Deleted pet: name=${name}`);
  } catch (error) {
    console.error("Error deleting pet:", error.message);
    res.status(500).json({ error: "Failed to delete pet from database." });
  }
};
