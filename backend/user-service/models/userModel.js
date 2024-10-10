const mysql = require("mysql2/promise");
const config = require("../config/config");

const dbData = {
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
};

const pool = mysql.createPool({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});

exports.createNewUser = async function (username, email, password_hash) {
  try {
    await pool.execute(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, password_hash]
    );

    console.log("Succesfully created user.");
  } catch (error) {
    console.error("Error creating new user: ", error);
    throw error;
  }
};
