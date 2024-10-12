const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const salt = 10;

const dbData = config.database;

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

exports.verifyUser = async function (email, password) {
  try {
    const [result] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const user = result[0];

    if (!user) {
      return { message: "User not found." };
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return { success: false, message: "Invalid password." };
    }

    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error("Error verifying user.");
    throw error;
  }
};

// exports.deleteUser = async function (username) {
//   try {
//     await pool.execute("DELETE FROM users WHERE username = ?", [username]);

//     console.log("Successfully deleted user.");
//   } catch (error) {
//     console.error("Error deleting user: ", error);
//     throw error;
//   }
// };
