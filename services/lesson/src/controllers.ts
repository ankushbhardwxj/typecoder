import lessonSchema from "./model";
import mongoose from "mongoose";
import { Request, Response } from "express";
import forge from 'node-forge';

export async function getAllLessons(req: Request, res: Response) {
  try {
    const results = await lessonSchema.find();
    res.status(200).json({ results: results });
  } catch (err) {
    console.error("Failed to get all lessons");
    res.status(500).json({ error: "Failed to get all lessons" });
  }
}

export async function addLesson(req: Request, res: Response) {
  try {
    const lesson = new lessonSchema({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      language: req.body.language,
      content: req.body.content,
      leaderboard: [],
      userPerformance: []
    });
    await lesson.save();
    res.status(200).json({ message: "Added lesson " + req.body.title });
  } catch (err) {
    console.error("Failed to add lesson");
    res.status(500).json({ error: "Failed to add lesson" });
  }
}

export async function deleteLessonById(req: Request, res: Response) {
  try {
    const deletedLesson = await lessonSchema.findOneAndDelete({
      _id: req.params.id
    });
    console.log(deletedLesson);
    res.status(200).json({ message: "Removed lesson" });
  } catch (err) {
    console.error("Failed to delete lesson");
    res.status(500).json({ error: "Failed to delete lesson" });
  }
}

export async function getLessonById(req: Request, res: Response) {
  try {
    const results = await lessonSchema.findOne({ _id: req.params.id });
    console.log(results);
    res.status(200).json({ result: results });
  } catch (err) {
    console.error("Couldn't get lesson");
    res.status(500).json({ error: "Failed to get lesson" });
  }
}

export async function addUserToLeaderboard(req: Request, res: Response) {
  try {
    const user = { name: req.body.username, wpm: req.body.wpm };
    const lessonId = req.params.id;
    const updateLeaderboard = await lessonSchema.updateOne(
      { _id: lessonId }, {$push: { leaderboard: { 
        $each: [user],
        $sort: { wpm: -1 }
      }}}
    );
    res.status(200).json({ result: updateLeaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user to leaderboard" });
  }
}

export async function updateUserDataInLeaderboard(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const wpm = req.body.wpm;
    if (username !== undefined && wpm !== undefined) {
      const lessonId = req.params.id;
      const lesson = await lessonSchema.findOne({_id: lessonId});
      const leaderboard = lesson.leaderboard; 
      let found = false;
      for (let i=0; i<leaderboard.length; i++) {
        if (leaderboard[i].name === username) {
          if (wpm > leaderboard[i].wpm)
            leaderboard[i].wpm = wpm;
          found = true;
        }
      }
      if (!found) {
        const user = { name: req.body.username, wpm: req.body.wpm };
        await lessonSchema.updateOne(
          { _id: lessonId }, {$push: { leaderboard: { 
            $each: [user],
            $sort: { wpm: -1 }
          }}}
        );
      }
      else await lesson.save();
      res.status(200).json({ result: "Success updating leaderboard"});
    } else throw new Error("Invalid request payload");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update leaderboard" });
  }
}

export async function checkUserInLeaderboard(req: Request, res: Response) {
  try {
    const lessonId = req.params.id;
    const results = await lessonSchema
      .findOne({ _id: lessonId })
      .sort({ 'wpm': 1 });
    const leaderboard = results.leaderboard;
    const username = req.body.username;
    for (let i=0; i<leaderboard.length; i++) {
      if (leaderboard[i].name === username) res.status(200).json({result: true});
    }
    res.status(200).json({result: false});
  } catch (err) {
    res.status(500).json({ error: "Failed to get lesson" });
  }
}

export async function getLeaderboardByLesson(req: Request, res: Response) {
  try {
    const lessonId = req.params.id;
    const results = await lessonSchema
      .findOne({ _id: lessonId })
      .sort({ 'wpm': 1 })
    res.status(200).json({ result: results.leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get leaderboard of lesson" });
  }
}

export async function deleteLeaderboard(req: Request, res: Response) {
  try {
    const lessonId = req.params.id;
    const lesson = await lessonSchema.findOne({_id: lessonId});
    lesson.leaderboard = [];
    await lesson.save();
    res.status(200).json({ result: "Success reseting leaderboard"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset leaderboard of lesson" });
  }
}
