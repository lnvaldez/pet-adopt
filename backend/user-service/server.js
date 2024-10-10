const express = require("express");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/user", userRoutes);

const PORT = process.env.PORT || 6000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`User service running at port ${PORT}`));
} else {
  module.exports = app;
}
