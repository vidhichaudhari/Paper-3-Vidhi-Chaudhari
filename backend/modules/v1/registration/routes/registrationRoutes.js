import express from "express";
import { registerForEvent } from "../controller/registrationController.js";
import Registration from "../../../../database/models/Registration.js";
import { cancelRegistration } from "../controller/registrationController.js";
import { auth } from "../../../../middleware/authMiddleware.js";
import {getMyRegistrations, updateAttendanceStatus } from "../controller/registrationController.js";



const router = express.Router();

router.post("/register", auth, registerForEvent);
router.get("/my", auth, getMyRegistrations);
router.post("/cancel/:id", auth, cancelRegistration);
router.post("/attendance/:registrationId", auth, updateAttendanceStatus);


export default router;
