const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// signup
router.post("/signup", async (req, res) => {
  try {
    let { username, password, fullName, email } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 12);
    const userObject = new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      fullName: fullName,
      username: username,
      password: encryptedPassword,
      date: new Date().toLocaleString(),
    });
    await userObject.save();
    res.status(201).json({
      action: "User sign up successful !",
      user: userObject,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// signin
router.post("/signin", async (req, res) => {
  try {
    let { username, password } = req.body;
    let { password: actualPassword } = await User.findOne({
      username: username,
    }).exec();
    await bcrypt.compare(password, actualPassword);
    res.status(201).json({
      action: "User sign in successful !",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// github oauth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    let { username, displayName } = req.user;
    res.redirect(`http://localhost:3000/app/users/${username}/profile`);
  }
);

// google oauth

module.exports = router;
