const Adopt = require("../models/adoptModel");
const rabbitmq = require("../../shared/rabbitmq/publishMessage");
const CircuitBreaker = require("opossum");

const rabbitmqUrl = "amqp://localhost:5672";

exports.adoptPet = async (req, res) => {
  const { petId, adopterId } = req.body;

  const message = { petId, adopterId };

  const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
  };

  const publishMessageWithBreaker = new CircuitBreaker(
    rabbitmq.publishMessage,
    options
  );

  try {
    await Adopt.adoptPet(petId, adopterId);

    await publishMessageWithBreaker.fire("pet_adopted", message, rabbitmqUrl);

    res.status(201).json({ message: "Adoption successful." });
  } catch (error) {
    if (publishMessageWithBreaker.opened) {
      console.error("Circuit is open, too many failures:", error);
    }
    res.status(500).json({ error: "Failed to adopt a pet." });
  }
};
