const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const config = require("../config/config");

const saltRounds = 10;
const dbData = config.database;

const pool = mysql.createPool({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});

exports.createNewUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await pool.execute(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    console.log(`Successfully created user: username=${username}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error("Failed to create user.");
  }
};

exports.verifyUser = async (email, password) => {
  try {
    const [result] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = result[0];

    if (!user) return { success: false, message: "User not found." };

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return { success: false, message: "Invalid password." };

    const { password_hash, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error("Error verifying user:", error.message);
    throw new Error("Failed to verify user.");
  }
};
