const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await User.createNewUser(username, email, password);
    res.status(201).json({ message: "User added." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user." });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.verifyUser(email, password);

    if (!result.success) {
      return res.status(401).json({
        sucess: false,
        message: result.message,
      });
    }

    const token = jwt.sign(
      ({ userId: result.user.id, email: result.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" })
    );

    res.json({
      sucess: true,
      token,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const username = req.body;

  try {
    await User.deleteUser(username);
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};
