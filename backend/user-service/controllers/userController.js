const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

dotenv.config();

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await User.createNewUser(username, email, password);
    res.status(201).json({ message: "User added." });
    console.log(`User created: username=${username}, email=${email}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Failed to add user." });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.verifyUser(email, password);

    if (!result.success) {
      console.log("User verification failed:", result.message);
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    const token = jwt.sign(
      { userId: result.user.id, email: result.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log(`User verified: email=${email}`);
    res.json({
      success: true,
      token,
      user: result.user,
    });
  } catch (error) {
    console.error("Error verifying user:", error.message);
    res.status(500).json({
      success: false,
      message: "Login failed.",
      error: error.message,
    });
  }
};
