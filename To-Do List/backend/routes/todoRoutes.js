import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete
} from "../controllers/todoController.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", asyncHandler(getTodos));         // GET /api/todos
router.post("/", asyncHandler(createTodo));      // POST /api/todos
router.get("/:id", validateObjectId, asyncHandler(getTodoById)); // GET /api/todos/:id
router.put("/:id", validateObjectId, asyncHandler(updateTodo));  // PUT /api/todos/:id
router.patch("/:id/toggle", validateObjectId, asyncHandler(toggleComplete)); // PATCH
router.delete("/:id", validateObjectId, asyncHandler(deleteTodo)); // DELETE

export default router;
