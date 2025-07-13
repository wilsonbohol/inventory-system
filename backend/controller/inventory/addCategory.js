const db = require("../../config/db");

async function addCategoryController(req, res) {
  try {
    const capitalize = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const slugify = (str) => {
      return str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
    };
    let { categoryName } = req.body;

    if (!categoryName) {
      throw new Error("Please Provide Category");
    }
    const capitalizeName = capitalize(categoryName);
    const slug = slugify(categoryName);
    const [duplicateCategory] = await db.query(
      "SELECT * FROM categories WHERE category_name = ? OR slug =? ",
      [capitalizeName, slug]
    );
    if (duplicateCategory.length > 0) {
      throw new Error("Duplicate Category");
    }
    const result = await db.query(
      "INSERT INTO categories (category_name,slug) VALUES (?, ?)",
      [capitalizeName, slug]
    );

    res.status(201).json({
      success: true,
      error: false,
      data: result,
      message: "Category Added Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
}

module.exports = addCategoryController;
