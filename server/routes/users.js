const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lesson = require('../models/Lesson');

// get all information about user
router.get('/:user/info', async (req, res) => {
  try {
    const getUserInfo = await User.find({username: req.params.user});
    res.status(200).json(getUserInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// get all public lessons of an user
router.get('/:user/lessons', async (req, res) => {
  try {
    const getLessons = await User.findOne({username: req.params.user});
    const posts = getLessons.public_lessons;
    const results = await Lesson.find({_id: {$in: posts}});
    res.status(201).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
});

// post a public lesson for an user
router.post('/:user/lesson/create-lesson', async (req, res) => {
  try {
    const lesson = new Lesson({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      code: req.body.code,
    });
    await lesson.save();
    const user = User.updateOne({username: req.params.user},
        {$push: {'public_lessons': lesson._id}});
    user.exec();
    res.status(200).json({message: 'Successfully saved code'});
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
});


module.exports = router;
