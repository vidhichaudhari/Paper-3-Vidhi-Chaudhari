import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controller/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.post("/filter", getEvents);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);


export default router;
