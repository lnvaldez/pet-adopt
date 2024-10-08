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
    const [result] = await db
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
