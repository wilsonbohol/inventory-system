const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    console.log("Received cookies:", req.cookies);
    if (!token) {
      return res.status(401).json({
        message: "Please Login..",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      console.log(err);

      if (err) {
        console.log("ERROR AUTH:", err);
        return res.status(401).json({
          message: "Invalid or expired token.",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?.id;
      next();
    });
  } catch (err) {
    console.log("ERROR CATCH:", err);
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
