import React, { useEffect, useState } from "react";
import todoApi from "../api/todoApi";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import EditModal from "./EditModal";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await todoApi.listTodos({ q: query, limit: 200 });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load");
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchTodos(); }, [query]);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2600); };

  const handleAdd = async (payload) => {
    try {
      const res = await todoApi.createTodo(payload);
      setTodos(prev => [res.data, ...prev]);
      showToast("Added");
    } catch {
      showToast("Add failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await todoApi.toggleTodo(id);
      setTodos(prev => prev.map(t => t._id === id ? res.data : t));
    } catch {
      showToast("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("Delete this task?")) return;
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(t => t._id !== id));
      showToast("Deleted");
    } catch {
      showToast("Delete failed");
    }
  };

  const handleEditOpen = (todo) => setEditing(todo);
  const handleEditSave = async (payload) => {
    try {
      const res = await todoApi.updateTodo(editing._id, payload);
      setTodos(prev => prev.map(t => t._id === editing._id ? res.data : t));
      setEditing(null);
      showToast("Saved");
    } catch {
      showToast("Save failed");
    }
  };

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <div className="logo">AC</div>
          <div>
            <div className="h1">What do you have on your mind?</div>
            <div className="h2">Let's add it and get it done!</div>
          </div>
        </div>
        <div className="meta">Tasks: <strong>{todos.length}</strong></div>
      </div>

      <div className="layout">
        <div className="left-col">
          <TodoForm onAdd={handleAdd} />
          <div className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontWeight:800}}>Search</div>
              <div className="meta">live</div>
            </div>
            <div className="form-row">
              <input className="input" placeholder="Search title, description, tags..." value={query} onChange={(e)=>setQuery(e.target.value)} />
              <button className="btn ghost small" onClick={()=>setQuery("")}>Clear</button>
            </div>
            <div style={{color:"var(--muted)", fontSize:13, marginTop:8}}>Tip: type to filter. Results update automatically.</div>
          </div>
        </div>

        <div>
          <div className="right-head">
            <div style={{fontWeight:800}}>To-Do</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="btn small" onClick={fetchTodos}>Refresh</button>
            </div>
          </div>

          {loading ? (
            <div className="card"><div className="spinner" /></div>
          ) : todos.length === 0 ? (
            <div className="card empty">
              <div style={{fontWeight:800, fontSize:16}}>No tasks yet</div>
              <div style={{marginTop:8, color:"var(--muted)"}}>Use the form to the left to add your first task — quick & simple.</div>
            </div>
          ) : (
            <div className="grid">
              {todos.map(t => (
                <TodoItem key={t._id} todo={t} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEditOpen} />
              ))}
            </div>
          )}
        </div>
      </div>

      {editing && <EditModal todo={editing} onClose={()=>setEditing(null)} onSave={handleEditSave} />}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
