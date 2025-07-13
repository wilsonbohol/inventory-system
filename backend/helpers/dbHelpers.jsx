const db = require('./config/db.jsx')

function findUserByEmail(email) {
    return db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  }
  
  // Create a new user
  function createUser(email, password, name, role) {
    return db.promise().query(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)', 
      [email, password, name, role]
    );
  }
  
  module.exports = { findUserByEmail, createUser };