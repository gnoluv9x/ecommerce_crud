import express from "express";
import { signup, signin, signout, refreshToken } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refreshToken", refreshToken);

module.exports = router;
