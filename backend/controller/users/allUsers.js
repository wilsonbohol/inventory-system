const db = require("../../config/db.js");

async function allUsers(req, res) {
  try {
    const user = await db.execute("SELECT * FROM users");
    const allUserData = user[0];
    res.status(200).json({
      message: "All Users",
      data: allUserData,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
