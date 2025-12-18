import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default {
  listTodos: (params) => axios.get(`${API_BASE}/todos`, { params }).then(r => r.data),
  getTodo: (id) => axios.get(`${API_BASE}/todos/${id}`).then(r => r.data),
  createTodo: (payload) => axios.post(`${API_BASE}/todos`, payload).then(r => r.data),
  updateTodo: (id, payload) => axios.put(`${API_BASE}/todos/${id}`, payload).then(r => r.data),
  deleteTodo: (id) => axios.delete(`${API_BASE}/todos/${id}`).then(r => r.data),
  toggleTodo: (id) => axios.patch(`${API_BASE}/todos/${id}/toggle`).then(r => r.data)
};
