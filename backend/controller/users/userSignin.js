const db = require("../../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userSigninController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!rows || rows.length === 0) {
      throw new Error("No User Found");
    }

    const user = rows[0];

    const checkPassword = await bcrypt.compare(password, user?.password);

    if (!checkPassword) {
      throw new Error("Invalid Password or Email");
    }
    if (checkPassword) {
      const tokenData = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      console.log("Generated Token:", token);
      console.log("Generated Token:", tokenData.id, tokenData.email);

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      return res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: {
          token: token,
          Role: user.Role,
        },
        success: true,
        error: false,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: true,
    });
  }
}

module.exports = userSigninController;
