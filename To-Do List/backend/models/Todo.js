import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, default: "" },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  dueDate: { type: Date, default: null },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Todo", todoSchema);
