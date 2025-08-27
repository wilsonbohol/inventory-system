const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");
const db = require("./config/db.js");

const app = express();
db.query("SELECT 1")
  .then(() => console.log(" MySQL connected"))
  .catch((err) => console.error(" MySQL connection error", err));
const allowedOrigins = [process.env.FRONTEND_URL, process.env.USER_URL];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Connected to DB");
  console.log("Server is Running", PORT);
  console.log("Allowed Origins:", allowedOrigins);
});
