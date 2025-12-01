import express from "express";
import { registerForEvent } from "../controller/registrationController.js";
import { auth } from "../../../../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", auth, registerForEvent);

export default router;
