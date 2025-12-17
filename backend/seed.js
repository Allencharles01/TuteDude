// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    title: "Neon Green Hoodie",
    price: 1999,
    category: "Clothing",
    image:
      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg"
  },
  {
    title: "Purple Street Jacket",
    price: 2499,
    category: "Clothing",
    image:
      "https://images.pexels.com/photos/7671159/pexels-photo-7671159.jpeg"
  },
  {
    title: "Minimalist Sneakers",
    price: 2999,
    category: "Footwear",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  },
  {
    title: "Retro Camera",
    price: 4999,
    category: "Gadgets",
    image:
      "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg"
  }
];

const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected (seed) ✅");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Sample products inserted ✅");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
})();
