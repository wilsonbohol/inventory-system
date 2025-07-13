const db = require("../../config/db.js");
const updateUserPermission = require("../../helpers/permission.js");

async function updateUserController(req, res) {
  try {
    if (!updateUserPermission) {
      throw new Error("Permission Denied");
    }

    console.log("UpdateController What is userid", req.userId);
    const { id, ...updateData } = req.body;
    console.log("Received id for update:", id);
    const [updateUser] = await db.query("UPDATE users SET ? WHERE id = ?", [
      updateData,
      id,
    ]);
    console.log("Update result:", updateUser);
    res.status(200).json({
      message: "Update User Successfully",
      data: updateUser,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = updateUserController;
