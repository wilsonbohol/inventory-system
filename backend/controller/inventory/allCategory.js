const db = require("../../config/db");
async function allCategoryController(req, res) {
  try {
    const [allCategory] = await db.query(
      "SELECT id, category_name, slug, date_created FROM categories"
    );
    res.status(200).json({
      success: true,
      error: false,
      message: "All Category",
      data: allCategory,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
}

module.exports = allCategoryController;
