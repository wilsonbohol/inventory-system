const db = require("../../config/db.js");

async function userDetailsController(req, res) {
  try {
    const user = await db.execute("SELECT * FROM users Where id = ?", [
      req.userId,
    ]);
    const userData = user[0][0];
    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    console.log("WHAT IS THE FCKIING USER", userData);
    res.status(200).json({
      data: userData,
      error: false,
      success: true,
      message: "USER DETAILSS",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userDetailsController;
