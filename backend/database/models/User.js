import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: 
    { type: String, required: true },

    email:
     { type: String, unique: true, sparse: true }, 

    mobile: 
    { type: String, unique: true, sparse: true }, 

    password: 
    { type: String, default: null },

    login_type: {
      type: String,
      enum: ["N", "G", "F", "A"],
      default: "N"
    },

    social_id:
     { type: String, default: null }, 
    resetOTP: 
    { type: Number, default: null },
    otpExpiry:
     { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
