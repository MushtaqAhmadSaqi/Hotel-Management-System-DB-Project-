const Admin = require("../models/Admin");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      admin: {
        username: admin.username,
        fullName: admin.fullName
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
