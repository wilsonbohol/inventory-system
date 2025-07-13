const bcrypt = require("bcrypt");
const db = require("../../config/db.js");
async function userSignupController(req, res) {
  try {
    const { full_name, email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!full_name) {
      throw new Error("Please Provide Name");
    }
    if (!password) {
      throw new Error("Please Provide Name");
    }
    if (rows.length > 0) {
      throw new Error("User Already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //Create User
    const [result] = await db.query(
      "INSERT INTO users (full_name, email, password, Role) VALUES (?,?,?,?)",
      [full_name, email, hashedPassword, "USER"]
    );

    res.status(201).json({
      success: true,
      message: `User Created Successfully ${full_name}`,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: true,
    });
  }
}

module.exports = userSignupController;
