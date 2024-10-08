const mysql = require("mysql2/promise");
const config = require("../config/config");

const dbData = config.database;

const db = mysql.createConnection({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});

exports.addPet = async function (name, type, age) {
  try {
    await db
      .promise()
      .execute("INSERT INTO pets (name, type, age) VALUES (?, ?, ?)", [
        name,
        type,
        age,
      ]);

    console.log("Succesfully added a new pet.");
  } catch (error) {
    console.error("Error adding new pet: ", error);
  }
};

exports.getPets = async function () {
  try {
    const [result] = await db
      .promise()
      .execute(
        "SELECT name, type, age, description FROM pets WHERE status = 'Available'"
      );

    console.log("Fetched all pets from database.");
    return result;
  } catch (error) {
    console.error("Error fetching all pets: ", error);
  }
};

exports.updatePet = async function (newName, name) {
  try {
    const [result] = await db
      .promise()
      .execute("UPDATE pets SET name = ? WHERE name = ? LIMIT 1", [
        newName,
        name,
      ]);

    if (result.affectedRows === 0) {
      throw new Error("Pet not found.");
    }

    console.log(`Updated pet ${name}'s to ${newName}.`);
  } catch (error) {
    console.error("Error updating pet name: ", error);
  }
};

exports.updatePetStatus = async function (name) {
  try {
    const [result] = await db
      .promise()
      .execute("UPDATE pets SET status = 'Adopted' WHERE name = ?", [name]);

    if (result.affectedRows === 0) {
      throw new Error("Pet not found.");
    }
  } catch (error) {
    console.error("Error updating pet status: ", error);
  }
};

exports.deletePet = async function (name) {
  try {
    const [result] = await db
      .promise()
      .execute("DELETE FROM pets WHERE name = ?", [name]);

    if (result.affectedRows === 0) {
      throw new Error("Pet not found.");
    }
  } catch (error) {
    console.error("Error deleting pet: ", error);
  }
};
