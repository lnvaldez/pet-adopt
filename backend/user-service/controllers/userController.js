const User = require("../models/userModel");

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
