"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const router = express_1.default.Router();
router.post("/lesson", controllers_1.addLesson);
router.get("/lesson", controllers_1.getAllLessons);
router.delete("/lesson/:id", controllers_1.deleteLessonById);
router.get("/lesson/:id", controllers_1.getLessonById);
router.get("/lesson/leaderboard/:id", controllers_1.getLeaderboardByLesson);
router.post("/lesson/leaderboard/:id", controllers_1.addUserToLeaderboard);
router.patch("/lesson/leaderboard/:id", controllers_1.updateUserDataInLeaderboard);
router.patch("/lesson/leaderboard/:id/reset", controllers_1.deleteLeaderboard);
exports.default = router;
//# sourceMappingURL=routes.js.map