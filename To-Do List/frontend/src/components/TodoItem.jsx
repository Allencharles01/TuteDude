import React from "react";

function IconEdit(){ return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> }

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const due = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : null;

  return (
    <div className="todo">
      <div className="todo-top">
        <div className="todo-left">
          <div
            className={`chk ${todo.completed ? "checked" : ""}`}
            onClick={() => onToggle(todo._id)}
            title={todo.completed ? "Mark incomplete" : "Mark complete"}
            role="button"
          >
            {todo.completed ? "✓" : ""}
          </div>

          <div style={{minWidth:0}}>
            <div className={`todo-title ${todo.completed ? "completed" : ""}`}>{todo.title}</div>
            <div className="todo-desc">{todo.description || <span style={{opacity:0.6}}>No description</span>}</div>
            <div className="meta" style={{marginTop:8}}>
              {due && <span style={{marginRight:10}}>Due: {due}</span>}
              <span style={{opacity:0.7}}>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
          <div className={`badge ${todo.priority || "low"}`}>{(todo.priority || "low").toUpperCase()}</div>
          <div className="actions">
            <button className="icon" onClick={() => onEdit(todo)} title="Edit">
              <IconEdit />
            </button>
            <button className="icon" onClick={() => onDelete(todo._id)} title="Delete">🗑</button>
          </div>
        </div>
      </div>
    </div>
  );
}
