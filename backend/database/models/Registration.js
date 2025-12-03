import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event:
     { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user:
     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tickets:
     { type: Number, required: true },
    status:
     { type: String, enum: ["confirmed", "waitlisted"], default: "confirmed" },
    qrCode: String,
    attendanceStatus: { type: String, default: "non-checked" }
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema);
