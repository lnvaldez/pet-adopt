const express = require("express");
const dotenv = require("dotenv");
const { consumeMessage } = require("../shared/rabbitmq/consumeMessage");
const { processAdoptionMessage } = require("./utils/processMessage");
const petRoutes = require("./routes/petRoutes");

dotenv.config();

const app = express();
const rabbitmqUrl = "amqp://localhost:5672";

app.use(express.json());
app.use("/pets", petRoutes);

const PORT = process.env.PORT || 6001;

consumeMessage("pet_adopted", processAdoptionMessage, rabbitmqUrl).catch(
  (error) => console.error("Failed to set up message consumer:", error.message)
);

if (require.main === module) {
  app.listen(PORT, () => console.log(`Pet service running at port ${PORT}`));
} else {
  module.exports = app;
}
