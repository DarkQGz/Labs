"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
  due: string;
  done: boolean;
}

export default function TodoGame() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState<"all" | "done" | "notdone">("all");
  const [nextId, setNextId] = useState(1);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: nextId, text: input.trim(), due, done: false },
    ]);
    setNextId((prev) => prev + 1);
    setInput("");
    setDue("");
  };

  const toggleDone = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.done;
    return !task.done;
  });

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
      }}
    >
      <h1 style={{ marginBottom: "20px", letterSpacing: "1px" }}>To-Do</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          style={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
            outline: "none",
            width: "180px",
          }}
        />
        <input
          type="datetime-local"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
            outline: "none",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 18px",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "50px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#ccc")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
        >
          Add
        </button>
      </div>

      <div style={{ marginTop: "25px" }}>
        {["all", "done", "notdone"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as "all" | "done" | "notdone")}
            style={{
              marginRight: "8px",
              padding: "6px 12px",
              borderRadius: "20px",
              border: filter === f ? "1px solid #fff" : "1px solid #444",
              background: filter === f ? "#fff" : "#111",
              color: filter === f ? "#000" : "#ccc",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {f === "all" ? "All" : f === "done" ? "Done" : "Not Done"}
          </button>
        ))}
      </div>

      <ul
        style={{
          listStyle: "none",
          marginTop: "25px",
          padding: 0,
          width: "360px",
        }}
      >
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#111",
              padding: "12px 15px",
              borderRadius: "10px",
              marginBottom: "10px",
              border: "1px solid #222",
              boxShadow: "0 0 10px rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
                style={{
                  marginRight: "10px",
                  width: "16px",
                  height: "16px",
                  cursor: "pointer",
                  accentColor: "#fff",
                }}
              />
              <span
                style={{
                  textDecoration: task.done ? "line-through" : "none",
                  color: task.done ? "#777" : "#fff",
                }}
              >
                {task.text}
              </span>
              <span style={{ marginLeft: "10px", color: "#888", fontSize: "0.85rem" }}>
                ({task.due ? new Date(task.due).toLocaleString() : "No due"})
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#ccc")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
