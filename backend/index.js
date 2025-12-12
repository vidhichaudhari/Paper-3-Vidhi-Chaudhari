import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import GLOBALS from "./config/constant.js";
import authRoutes from "./modules/v1/auth/routes/authRoutes.js";
import eventRoutes from "./modules/v1/event/routes/eventRoutes.js";
import bookingRoutes from "./modules/v1/registration/routes/registrationRoutes.js";

dotenv.config();
connectDB();  

const app = express();
const PORT = GLOBALS.PORT ?? process.env.PORT ?? 3000;

app.use(cors({
  origin: "*",      
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/uploads", express.static("uploads"));




app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
