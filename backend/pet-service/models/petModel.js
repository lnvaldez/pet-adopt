const mysql = require("mysql2/promise");
const config = require("../config/config");

const dbData = config.database;

const pool = mysql.createPool({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});

exports.addPet = async (name, type, age) => {
  try {
    await pool.execute("INSERT INTO pets (name, type, age) VALUES (?, ?, ?)", [
      name,
      type,
      age,
    ]);
    console.log(
      `Successfully added new pet: name=${name}, type=${type}, age=${age}`
    );
  } catch (error) {
    console.error("Error adding new pet:", error.message);
    throw new Error("Failed to add pet.");
  }
};

exports.getPets = async () => {
  try {
    const [result] = await pool.execute(
      "SELECT name, type, age, description FROM pets WHERE status = 'Available'"
    );
    console.log("Fetched all available pets.");
    return result;
  } catch (error) {
    console.error("Error fetching pets:", error.message);
    throw new Error("Failed to fetch pets.");
  }
};

exports.updatePet = async (newName, name) => {
  try {
    const [result] = await pool.execute(
      "UPDATE pets SET name = ? WHERE name = ? LIMIT 1",
      [newName, name]
    );
    if (result.affectedRows === 0) throw new Error("Pet not found.");

    console.log(
      `Successfully updated pet: oldName=${name}, newName=${newName}`
    );
  } catch (error) {
    console.error("Error updating pet:", error.message);
    throw new Error("Failed to update pet.");
  }
};

exports.updatePetStatus = async (id) => {
  try {
    const [result] = await pool.execute(
      "UPDATE pets SET status = 'Adopted' WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) throw new Error("Pet not found.");

    console.log(`Updated pet status to 'Adopted': id=${id}`);
  } catch (error) {
    console.error("Error updating pet status:", error.message);
    throw new Error("Failed to update pet status.");
  }
};

exports.deletePet = async (name) => {
  try {
    const [result] = await pool.execute("DELETE FROM pets WHERE name = ?", [
      name,
    ]);
    if (result.affectedRows === 0) throw new Error("Pet not found.");

    console.log(`Successfully deleted pet: name=${name}`);
  } catch (error) {
    console.error("Error deleting pet:", error.message);
    throw new Error("Failed to delete pet.");
  }
};
