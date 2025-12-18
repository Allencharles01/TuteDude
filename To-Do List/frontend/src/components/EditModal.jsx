import React, { useState } from "react";

export default function EditModal({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority || "low");

  const save = async (e) => {
    e.preventDefault();
    await onSave({ title: title.trim(), description, priority });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e)=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontWeight:800}}>Edit Task</div>
          <button className="icon" onClick={onClose} aria-label="close">✕</button>
        </div>

        <form onSubmit={save}>
          <div style={{marginBottom:10}}>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
          </div>
          <div style={{marginBottom:10}}>
            <input className="input" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center",justifyContent:"space-between"}}>
            <select className="select" value={priority} onChange={e=>setPriority(e.target.value)} style={{width:160}}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div style={{display:"flex",gap:8}}>
              <button type="button" className="btn ghost small" onClick={onClose}>Cancel</button>
              <button className="btn small" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
