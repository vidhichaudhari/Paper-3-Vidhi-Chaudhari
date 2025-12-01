import mongoose from "mongoose";
import dotenv from "dotenv";
import catogory from "../database/models/catogory.js";


dotenv.config();

const categories = [
  { name: "Music", description: "Concerts, Live shows, DJ events" },
  { name: "Sports", description: "Tournaments, marathons, fitness events" },
  { name: "Technology", description: "Tech conferences, hackathons, workshops" },
  { name: "Business", description: "Business summits, networking events" },
  { name: "Education", description: "Seminars, training, coaching" },
  { name: "Food & Drinks", description: "Food festivals, tasting events" },
  { name: "Festival", description: "Cultural festivals, seasonal celebrations" },
  { name: "Art & Culture", description: "Exhibitions, theater, crafts" }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");

    await Category.deleteMany(); 
    await Category.insertMany(categories);

    console.log("Category Seeder Inserted Successfully");
    process.exit();
  } catch (error) {
    console.log("Seeder Error:", error);
    process.exit(1);
  }
};

seedCategories();
