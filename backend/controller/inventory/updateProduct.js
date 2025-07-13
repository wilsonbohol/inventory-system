const db = require("../../config/db");
const updateUserPermission = require("../../helpers/permission");

async function updateProductController(req, res) {
  try {
    if (!updateUserPermission) {
      throw new Error("Permission Denied");
    }
    const { id, product_name } = req.body;
    const updateProduct = db.query(
      "UPDATE products SET name = ? WHERE id = ?",
      [product_name, id]
    );
    res.status(200).json({
      message: "Product Updated",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.messsage || err,
      success: false,
      error: true,
    });
  }
}

module.exports = updateProductController;
