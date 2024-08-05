import express from "express"
import { getUserProfileAndRepos, likeProfileFunc, getLikes } from "../controllers/userControllers.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js"

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos)
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfileFunc)

export default router;