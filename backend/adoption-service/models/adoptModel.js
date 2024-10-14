const mysql = require("mysql2/promise");
const config = require("../config/config");

const dbData = config.database;

const pool = mysql.createPool({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});

exports.adoptPet = async (petId, adopterId) => {
  try {
    await pool.execute(
      "INSERT INTO adoptions (pet_id, adopter_id) VALUES (?, ?)",
      [petId, adopterId]
    );
    console.log(`Adoption successful: petId=${petId}, adopterId=${adopterId}`);
  } catch (error) {
    console.error("Error adopting pet:", error.message);
    throw new Error("Failed to adopt pet.");
  }
};
