import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in environment");
  process.exit(1);
}

await connectDB(MONGO_URI);

app.get("/", (req, res) => res.send("To-Do API running"));

app.use("/api/todos", todoRoutes);

// central error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
