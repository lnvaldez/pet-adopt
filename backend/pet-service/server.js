const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Pet service running on port ${PORT}`));
