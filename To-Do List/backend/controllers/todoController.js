import Joi from "joi";
import Todo from "../models/Todo.js";

const todoCreateSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().allow("", null),
  completed: Joi.boolean(),
  priority: Joi.string().valid("low", "medium", "high"),
  dueDate: Joi.date().allow(null),
  tags: Joi.array().items(Joi.string())
});

const todoUpdateSchema = Joi.object({
  title: Joi.string().max(200),
  description: Joi.string().allow("", null),
  completed: Joi.boolean(),
  priority: Joi.string().valid("low", "medium", "high"),
  dueDate: Joi.date().allow(null),
  tags: Joi.array().items(Joi.string())
}).min(1);

export const getTodos = async (req, res) => {
  const { q, completed, page = 1, limit = 20, sort } = req.query;
  const filter = {};
  if (q) {
    filter.$or = [
      { title: new RegExp(q, "i") },
      { description: new RegExp(q, "i") },
      { tags: new RegExp(q, "i") }
    ];
  }
  if (completed === "true" || completed === "false") filter.completed = completed === "true";

  let sortObj = { createdAt: -1 };
  if (sort) {
    const [field, dir] = sort.split(":");
    sortObj = { [field]: dir === "asc" ? 1 : -1 };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const todos = await Todo.find(filter).sort(sortObj).skip(skip).limit(Number(limit));
  const total = await Todo.countDocuments(filter);

  res.json({ success: true, data: todos, meta: { total, page: Number(page), limit: Number(limit) } });
};

export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
  res.json({ success: true, data: todo });
};

export const createTodo = async (req, res) => {
  const { error, value } = todoCreateSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message, errors: error.details });

  const todo = new Todo(value);
  await todo.save();
  res.status(201).json({ success: true, data: todo });
};

export const updateTodo = async (req, res) => {
  const { error, value } = todoUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message, errors: error.details });

  const todo = await Todo.findByIdAndUpdate(req.params.id, value, { new: true });
  if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
  res.json({ success: true, data: todo });
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
  res.json({ success: true, message: "Todo deleted" });
};

export const toggleComplete = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ success: false, message: "Todo not found" });
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ success: true, data: todo });
};
