const express = require("express");
const dotenv = require("dotenv");

const petRoutes = require("./routes/petRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/pets", petRoutes);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Pet service running on port ${PORT}`));
