import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    venue: String,
    location: String,
    price: Number,
    date: Date,
    seats: Number,            
    availableSeats: Number,   
    image: String,
    popularity: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
