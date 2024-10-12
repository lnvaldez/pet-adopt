const Pet = require("../models/petModel");

exports.processAdoptionMessage = async (message) => {
  try {
    const { petId } = message;
    await Pet.updatePetStatus(petId);
    console.log(`Updated status for pet ${petId} to Adopted`);
  } catch (error) {
    console.error("Error processing adoption message:", error);
  }
};
