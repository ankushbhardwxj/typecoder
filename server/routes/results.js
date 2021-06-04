const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Lesson = require("../models/Lesson");
const Result = require("../models/Result");

// post a result for a lesson typed by user
router.post("/:user/:lessonId/saveResult", async (req, res) => {
  try {
    const {
      totalTypedCharacters,
      correctlyTypedCharacters,
      unproductiveKeystrokes,
      elapsedTime,
      WPM,
    } = req.body;
    const { lessonId, user } = req.params;
    const lessonObject = await Lesson.findOne({ _id: lessonId }).exec();
    if (lessonObject === null) throw new Error("Lesson Not Found");
    const lesson = lessonObject.title;
    const result = new Result({
      _id: new mongoose.Types.ObjectId(),
      lesson: lesson,
      totalTypedCharacters: totalTypedCharacters,
      correctlyTypedCharacters: correctlyTypedCharacters,
      unproductiveKeystrokes: unproductiveKeystrokes,
      elapsedTime: elapsedTime,
      WPM: WPM,
    });
    await result.save();
    const userObject = User.updateOne(
      { username: user },
      { $push: { results: result._id } }
    );
    await userObject.exec();
    res.status(201).json({
      action: "Saved Result Successfully",
      resultId: result._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// get all results of an user
router.get("/:user/results", async (req, res) => {
  try {
    let { user } = req.params;
    const getResults = await User.findOne({ username: user }).exec();
    const resultsObjects = getResults.results;
    const results = await Result.find({ _id: { $in: resultsObjects } });
    res.status(201).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
