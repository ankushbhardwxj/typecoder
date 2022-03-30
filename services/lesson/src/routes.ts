import express from "express";
import {addLesson, deleteLessonById, getAllLessons, getLessonById, getLeaderboardByLesson, addUserToLeaderboard, getUserPositionFromLeaderboard} from "./controllers";

const router = express.Router();

router.post("/lesson", addLesson);
router.get("/lesson", getAllLessons);
router.delete("/lesson/:id", deleteLessonById);
router.get("/lesson/:id", getLessonById);
router.get("/lesson/leaderboard/:id", getLeaderboardByLesson);
router.post("/lesson/leaderboard/:id", addUserToLeaderboard);
router.get("/lesson/leaderboard/:id/:username", getUserPositionFromLeaderboard);

export default router;
