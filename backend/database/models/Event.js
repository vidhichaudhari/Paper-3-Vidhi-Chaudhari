import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title:
     { type: String, required: true },
    description:
    { type: String, required: true },
    category: 
    { type: String, required: true },
    venue:
    { type: String, required: true },
    location:
     { type: String, required: true },
    price:
     { type: Number, required: true },
    date: 
    { type: Date, required: true },
    seats: 
    { type: Number, required: true },        
    availableSeats: 
    { type: Number, required: true },  
    image: String,
    popularity: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
