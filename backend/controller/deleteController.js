const db = require("../config/db");

class DeleteController {
  constructor(tableName) {
    this.tableName = tableName;
  }

  deleteById = async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute(
        `DELETE FROM ${this.tableName} WHERE id = ?`,
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Item Not Found" });
      }
      return res.status(200).json({ message: "Item Deleted Successfully" });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: true,
        message: err.message || err,
      });
    }
  };
}

module.exports = DeleteController;
