const db = require("../../config/db");

async function addProductController(req, res) {
  try {
    const { product_name, quantity, description, slug } = req.body;

    if (!product_name) {
      throw new Error("Please Enter Product Name");
    }
    if (!quantity) {
      throw new Error("Please Enter Quantity");
    }
    if (!description) {
      throw new Error("Please Enter Description");
    }

    const [category] = await db.query(
      "SELECT * FROM categories WHERE slug = ? ",
      [slug]
    );
    const categoryId = category[0].id;
    const [rows] = await db.query(
      "SELECT * FROM products WHERE name = ? AND category_id = ?",
      [product_name, categoryId]
    );
    if (rows.length > 0) {
      throw new Error("Duplicate Product Name");
    }

    const addProduct = await db.query(
      "INSERT INTO products (name, stock, description, category_id) VALUES (?, ?, ?,?)",
      [product_name, quantity, description, categoryId]
    );

    res.status(201).json({
      message: "Product Added Successfully",
      success: true,
      error: false,
      data: addProduct,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
}

module.exports = addProductController;
