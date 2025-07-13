const db = require("../config/db.js");

const updateUserPermission = async (userId) => {
  const row = db.execute("SELECT * from users where id = ? ", [userId]);
  const user = row[0];
  if (user.role === "ADMIN") {
    return true;
  }

  return false;
};
module.exports = updateUserPermission;
