import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e?.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      await onAdd({ title: trimmed, description, priority });
      setTitle("");
      setDescription("");
      setPriority("low");
    } catch (e) {
      // handled upstream
    } finally {
      setLoading(false);
    }
  };

  // allow Enter in title to submit quickly
  const onTitleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      submit(e);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <div className="title-lg">Create Task</div>
          <div className="subtitle">Quick add a task — keyboard friendly (Enter to add).</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn small">{loading ? "Adding..." : "Add"}</button>
        </div>
      </div>

      <div className="form-row">
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onTitleKeyDown}
        />
      </div>

      <div className="form-row">
        <input
          className="input"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Priority buttons group */}
      <div className="form-row" style={{ alignItems: "center" }}>
        <div className="priority-group" style={{ display: "flex", gap: 10, width: "100%" }}>
          <button
            type="button"
            className={`priority-btn low ${priority === "low" ? "active" : ""}`}
            onClick={() => setPriority("low")}
          >
            Low
          </button>

          <button
            type="button"
            className={`priority-btn medium ${priority === "medium" ? "active" : ""}`}
            onClick={() => setPriority("medium")}
          >
            Medium
          </button>

          <button
            type="button"
            className={`priority-btn high ${priority === "high" ? "active" : ""}`}
            onClick={() => setPriority("high")}
          >
            High
          </button>
        </div>

        <div style={{ flex: 1 }} />

        <button className="btn" type="submit">{loading ? "Adding..." : "Add Task"}</button>
      </div>
    </form>
  );
}
