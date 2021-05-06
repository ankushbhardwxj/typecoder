const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// signup
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 12)
      .then((hashedPassword)=>{
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          fullName: req.body.fullName,
          username: req.body.username,
          password: hashedPassword,
          date: new Date().toLocaleString(),
        });
        user.save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: 'User signed up successfully',
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
});

// signin
router.post('/signin', (req, res) => {
  User.findOne({username: req.body.username}).exec()
      .then((user) => {
        bcrypt.compare(req.body.password, user.password)
            .then((domatch)=>{
              if (domatch) {
                res.status(200).json({
                  message: 'Sign in successful !',
                });
              } else {
                return res.status(500).json({
                  error: 'Sorry !! email and password is not match',
                });
              }
            })
            .catch((err)=>{
              console.log(err);
            });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
});

module.exports = router;
