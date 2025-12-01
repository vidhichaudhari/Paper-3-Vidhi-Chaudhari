import mongoose from "mongoose";
import GLOBALS from "../config/constant.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vidhich:vidhi12@event.2tuscto.mongodb.net/");
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
