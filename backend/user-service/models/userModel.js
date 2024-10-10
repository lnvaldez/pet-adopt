const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const salt = 10;

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

exports.createNewUser = async function (username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.execute(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    console.log("Succesfully created user.");
  } catch (error) {
    console.error("Error creating new user: ", error);
    throw error;
  }
};
