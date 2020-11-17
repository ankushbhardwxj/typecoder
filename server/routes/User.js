const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// signup
router.post('/signup', (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    fullName: req.body.fullName,
    username: req.body.username,
    password: req.body.password
  })
  user.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "User signed up successfully"
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

// signin
router.post('/signin', (req, res, next) => {
  User.findOne({ username: req.body.username }).exec()
    .then(user => {
      if (user.password == req.body.password) {
        res.status(200).json({
          message: 'Sign in successful !'
        })
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      })
    })
})

module.exports = router;