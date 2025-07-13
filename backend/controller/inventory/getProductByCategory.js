const db = require("../../config/db");

async function getProductsByCategory(req, res) {
  const { slug } = req.params;
  try {
    const [products] = await db.query(
      `SELECT products.* FROM products
            JOIN categories ON products.category_id = categories.id
            WHERE categories.slug = ?`,
      [slug]
    );
    res.status(200).json({
      success: true,
      error: false,
      message: `Products in Category "${slug}"`,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || err,
    });
  }
}

module.exports = getProductsByCategory;
