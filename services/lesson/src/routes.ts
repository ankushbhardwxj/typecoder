import express from "express";
import {addLesson, deleteLessonById, getAllLessons, getLessonById, getLeaderboardByLesson, addUserToLeaderboard, updateUserDataInLeaderboard, deleteLeaderboard} from "./controllers";

const router = express.Router();

router.post("/lesson", addLesson);
router.get("/lesson", getAllLessons);
router.delete("/lesson/:id", deleteLessonById);
router.get("/lesson/:id", getLessonById);
router.get("/lesson/leaderboard/:id", getLeaderboardByLesson);
router.post("/lesson/leaderboard/:id", addUserToLeaderboard);
router.patch("/lesson/leaderboard/:id", updateUserDataInLeaderboard);
router.patch("/lesson/leaderboard/:id/reset", deleteLeaderboard);

export default router;
