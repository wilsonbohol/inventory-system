const db = require("../../config/db");
const updateUserPermission = require("../../helpers/permission");

async function updateCategoryController(req, res) {
  try {
    if (!updateUserPermission) {
      throw new Error("Permission Denied");
    }
    const { id, category_name } = req.body;
    const slugify = (str) => {
      return str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
    };
    const slug = slugify(category_name);

    const updateCategory = await db.query(
      "UPDATE categories SET category_name = ?, slug = ? WHERE id = ?",
      [category_name, slug, id]
    );

    res.status(200).json({
      message: "Category Updated",
      success: true,
      error: false,
      data: updateCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateCategoryController;
