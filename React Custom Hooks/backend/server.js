// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assignment05_custom_hook";

let dbConnected = false;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    dbConnected = true;
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    dbConnected = false;
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("API running for Assignment 05");
});

/**
 * GET /api/products
 * Query params:
 *  - page (1-based)
 *  - limit (items per page)
 *
 * Returns: array of products (empty array if none)
 */
app.get("/api/products", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, parseInt(req.query.limit || "8", 10));
    const skip = (page - 1) * limit;

    if (!dbConnected) {
      // If DB not connected, return fallback data so frontend remains functional
      const fallback = [
        {
          "_id": "1",
          "title": "Neon Green Hoodie",
          "price": 1999,
          "category": "Clothing",
          "image": "https://m.media-amazon.com/images/I/71hN00CvJnL._SY741_.jpg"
        },
        {
          "_id": "2",
          "title": "Purple Street Jacket",
          "price": 2499,
          "category": "Clothing",
          "image": "https://imgs.search.brave.com/nw9lm59-84A3ZlMOzNZiVOg8r6rq4woGaxmH4XazFok/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2YwLzA4/Lzc5L2YwMDg3OWQy/MDNjMmIyZjkxMTk5/ZjA4YzcxMmY0OGQz/LmpwZw"
        },
        {
          "_id": "3",
          "title": "Minimalist Sneakers",
          "price": 2999,
          "category": "Footwear",
          "image": "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
        },
        {
          "_id": "4",
          "title": "Retro Camera",
          "price": 4999,
          "category": "Gadgets",
          "image": "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg"
        },
        {
          "_id": "5",
          "title": "Vibrant Pink Classic Sneakers",
          "price": 84,
          "category": "Shoes",
          "image": "https://i.imgur.com/mcW42Gi.jpeg"
        },
        {
          "_id": "6",
          "title": "Classic Comfort Fit Joggers",
          "price": 25,
          "category": "Clothes",
          "image": "https://nobero.com/cdn/shop/files/OliveGreen_a7f6444c-71b0-4298-8c2b-ed282eb16986.jpg?v=1747652139&width=940"
        },
        {
          "_id": "11",
          "title": "Classic Red Baseball Cap",
          "price": 35,
          "category": "Clothes",
          "image": "https://i.imgur.com/cBuLvBi.jpeg"
        },
        {
          "_id": "17",
          "title": "Classic Black T-Shirt",
          "price": 35,
          "category": "Clothes",
          "image": "https://i.imgur.com/9DqEOV5.jpeg"
        },
        {
          "_id": "14",
          "title": "Classic High-Waisted Athletic Shorts",
          "price": 43,
          "category": "Clothes",
          "image": "https://i.imgur.com/eGOUveI.jpeg"
        },
        {
          "_id": "16",
          "title": "Classic White Tee - Timeless Style and Comfort",
          "price": 73,
          "category": "Clothes",
          "image": "https://i.imgur.com/Y54Bt8J.jpeg"
        },
        {
          "_id": "7",
          "title": "Classic Comfort Drawstring Joggers",
          "price": 79,
          "category": "Clothes",
          "image": "https://i.imgur.com/mp3rUty.jpeg"
        },
        {
          "_id": "13",
          "title": "Classic Olive Chino Shorts",
          "price": 84,
          "category": "Clothes",
          "image": "https://i.imgur.com/UsFIvYs.jpeg"
        },
        {
          "_id": "15",
          "title": "Classic White Crew Neck T-Shirt",
          "price": 394,
          "category": "Clothes",
          "image": "https://i.imgur.com/axsyGpD.jpeg"
        },
        {
          "_id": "60",
          "title": "Men's Baggy Jean Pants",
          "price": 1499,
          "category": "Clothes",
          "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTdpmQhotbAq5NH1n8xf5vummdmG4hHl02bmt2RAdxBDjhMsoqcjFfvCvoBisp0RuZqGjqcRfjTolnD7uL5Ro35PdSlDr7rDP29Mpv_a-f6"
        },
        {
          "_id": "22",
          "title": "Sleek Wireless Computer Mouse",
          "price": 10,
          "category": "Electronics",
          "image": "https://i.imgur.com/w3Y8NwQ.jpeg"
        },
        {
          "_id": "20",
          "title": "Sleek Comfort-Fit Over-Ear Headphones",
          "price": 28,
          "category": "Electronics",
          "image": "https://i.imgur.com/SolkFEB.jpeg"
        },
        {
          "_id": "19",
          "title": "Sleek Wireless Headphone & Inked Earbud Set",
          "price": 44,
          "category": "Electronics",
          "image": "https://i.imgur.com/yVeIeDa.jpeg"
        },
        {
          "_id": "23",
          "title": "Sleek Modern Laptop with Ambient Lighting",
          "price": 43,
          "category": "Electronics",
          "image": "https://i.imgur.com/OKn1KFI.jpeg"
        },
        {
          "_id": "21",
          "title": "Efficient 2-Slice Toaster",
          "price": 48,
          "category": "Electronics",
          "image": "https://i.imgur.com/keVCVIa.jpeg"
        },
        {
          "_id": "25",
          "title": "Stylish Red & Silver Over-Ear Headphones",
          "price": 39,
          "category": "Electronics",
          "image": "https://i.imgur.com/YaSqa06.jpeg"
        },
        {
          "_id": "18",
          "title": "Sleek White & Orange Wireless Gaming Controller",
          "price": 69,
          "category": "Electronics",
          "image": "https://i.imgur.com/ZANVnHE.jpeg"
        },
        {
          "_id": "24",
          "title": "Sleek Modern Laptop for Professionals",
          "price": 97,
          "category": "Electronics",
          "image": "https://i.imgur.com/ItHcq7o.jpeg"
        },
        {
          "_id": "29",
          "title": "Mid-Century Modern Wooden Dining Table",
          "price": 24,
          "category": "Furniture",
          "image": "https://i.imgur.com/DMQHGA0.jpeg"
        },
        {
          "_id": "31",
          "title": "Modern Elegance Teal Armchair",
          "price": 25,
          "category": "Furniture",
          "image": "https://i.imgur.com/6wkyyIN.jpeg"
        },
        {
          "_id": "28",
          "title": "Sleek Modern Leather Sofa",
          "price": 53,
          "category": "Furniture",
          "image": "https://i.imgur.com/Qphac99.jpeg"
        },
        {
          "_id": "33",
          "title": "Modern Minimalist Workstation Setup",
          "price": 49,
          "category": "Furniture",
          "image": "https://i.imgur.com/3oXNBst.jpeg"
        },
        {
          "_id": "30",
          "title": "Elegant Golden-Base Stone Top Dining Table",
          "price": 66,
          "category": "Furniture",
          "image": "https://i.imgur.com/NWIJKUj.jpeg"
        },
        {
          "_id": "32",
          "title": "Elegant Solid Wood Dining Table",
          "price": 67,
          "category": "Furniture",
          "image": "https://i.imgur.com/4lTaHfF.jpeg"
        },
        {
          "_id": "34",
          "title": "Modern Ergonomic Office Chair",
          "price": 71,
          "category": "Furniture",
          "image": "https://i.imgur.com/3dU0m72.jpeg"
        },
        {
          "_id": "45",
          "title": "Sleek Futuristic Electric Bicycle",
          "price": 22,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/BG8J0Fj.jpg"
        },
        {
          "_id": "50",
          "title": "Trendy Pink-Tinted Sunglasses",
          "price": 38,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/0qQBkxX.jpg"
        },
        {
          "_id": "46",
          "title": "Sleek All-Terrain Go-Kart",
          "price": 37,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/Ex5x3IU.jpg"
        },
        {
          "_id": "48",
          "title": "Sleek Olive Green Hardshell Carry-On Luggage",
          "price": 48,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/jVfoZnP.jpg"
        },
        {
          "_id": "49",
          "title": "Chic Transparent Fashion Handbag",
          "price": 61,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/Lqaqz59.jpg"
        },
        {
          "_id": "47",
          "title": "Radiant Citrus Eau de Parfum",
          "price": 7366,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/xPDwUb3.jpg"
        },
        {
          "_id": "51",
          "title": "jsfksfjskjfkjsfkjskjKJFKJSKJF",
          "price": 10100000,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/TF0pXdL.jpg"
        },
        {
          "_id": "69",
          "title": "NIKE",
          "price": 122,
          "category": "Miscellaneous",
          "image": "https://i.imgur.com/QkIa5tT.jpeg"
        },
        {
          "_id": "35",
          "title": "Futuristic Holographic Soccer Cleats",
          "price": 39,
          "category": "Shoes",
          "image": "https://i.imgur.com/qNOjJje.jpeg"
        },
        {
          "_id": "36",
          "title": "Rainbow Glitter High Heels",
          "price": 39,
          "category": "Shoes",
          "image": "https://i.imgur.com/62gGzeF.jpeg"
        },
        {
          "_id": "44",
          "title": "Classic Blue Suede Casual Shoes",
          "price": 39,
          "category": "Shoes",
          "image": "https://i.imgur.com/sC0ztOB.jpeg"
        },
        {
          "_id": "37",
          "title": "Chic Summer Denim Espadrille Sandals",
          "price": 33,
          "category": "Shoes",
          "image": "https://i.imgur.com/9qrmE1b.jpeg"
        },
        {
          "_id": "38",
          "title": "Vibrant Runners: Bold Orange & Blue Sneakers",
          "price": 27,
          "category": "Shoes",
          "image": "https://i.imgur.com/hKcMNJs.jpeg"
        },
        {
          "_id": "41",
          "title": "Futuristic Chic High-Heel Boots",
          "price": 36,
          "category": "Shoes",
          "image": "https://i.imgur.com/HqYqLnW.jpeg"
        },
        {
          "_id": "40",
          "title": "Futuristic Silver and Gold High-Top Sneaker",
          "price": 68,
          "category": "Shoes",
          "image": "https://i.imgur.com/npLfCGq.jpeg"
        }
      ];

      // emulate pages
      const start = skip;
      const pageSlice = fallback.slice(start, start + limit);
      return res.json(pageSlice);
    }

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json(products);
  } catch (err) {
    console.error("Error in /api/products:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/** Optional: health endpoint */
app.get("/api/health", (req, res) => {
  res.json({ server: "ok", dbConnected });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
