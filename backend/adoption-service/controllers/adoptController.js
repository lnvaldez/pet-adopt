const Adopt = require("../models/adoptModel");
const rabbitmq = require("../../shared/rabbitmq/publishMessage");

const rabbitmqUrl = "amqp://localhost:5672";

exports.adoptPet = async (req, res) => {
  const { petId, adopterId } = req.body;

  const message = { petId: petId, adopterId: adopterId };

  try {
    await Adopt.adoptPet(petId, adopterId);
    await rabbitmq.publishMessage("pet_adopted", message, rabbitmqUrl);
    await res.status(201).json({ message: "Adoption succesful." });
  } catch (error) {
    res.status(500).json({ error: "Failed to adopt a pet." });
  }
};
