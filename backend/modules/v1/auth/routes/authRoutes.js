import express from "express";
import { signup, login, verifyEmail, resendOtp} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/reset-otp", resendOtp);

export default router;
