const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();

dotenv.config();
const PORT = process.env.PORT;
// fetch routes
const authRoutes = require("./routes/auth");
const userInfoRoutes = require("./routes/users");

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
app.use(passport.initialize());
app.use(passport.session());

// serialize & deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, id));

// Github OAuth passport config
const GITHUB_CLIENT_ID = "875e09e504840d8ef63e";
const GITHUB_CLIENT_SECRET = "28e593fbed8bf0989f34948e3ab01046e987bba7";
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      process.nextTick(() => done(null, profile));
    }
  )
);

// Controllers
app.use("/auth", authRoutes);
app.use("/users", userInfoRoutes);

// Github OAUTH callback
/*
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (res) => {
    console.log(res);
  }
);*/

// Listening to port
app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
