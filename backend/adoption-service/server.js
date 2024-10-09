const express = require("express");
const dotenv = require("dotenv");

const adoptRoutes = require("./routes/adoptRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/adopt", adoptRoutes);

const PORT = process.env.PORT || 6002;

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Adoption service running at port ${PORT}`)
  );
} else {
  module.exports = app;
}
