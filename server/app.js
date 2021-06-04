const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

dotenv.config();
const PORT = process.env.SERVER_PORT;
// fetch routes
const authRoutes = require("./routes/auth");
const userInfoRoutes = require("./routes/users");
const resultRoutes = require("./routes/results");

// connecting to mongodb database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});
mongoose.set("debug", true);
const db = mongoose.connection;
db.on("error", () => console.log("Failed to connect to DB"));
db.once("open", () => console.log("Successfully connected to DB"));

// compress responses
app.use(compression());
// enhanced API security
app.use(helmet());

// using bodyParser for parsing req body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// initialise passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Controllers
app.use("/auth", authRoutes);
app.use("/users", userInfoRoutes, resultRoutes);

// Listening to port
app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
