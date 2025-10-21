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
    setTasks(prev => [
      ...prev,
      { id: nextId, text: input.trim(), due, done: false },
    ]);
    setNextId(prev => prev + 1);
    setInput("");
    setDue("");
  };

  const toggleDone = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
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
      <h1>📝 To-Do</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task"
          style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", border: "none" }}
        />
        <input
          type="datetime-local"
          value={due}
          onChange={e => setDue(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "none" }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 15px",
            background: "#00ff88",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setFilter("all")} style={{ marginRight: 5, padding: "5px 10px" }}>
          All
        </button>
        <button onClick={() => setFilter("done")} style={{ marginRight: 5, padding: "5px 10px" }}>
          Done
        </button>
        <button onClick={() => setFilter("notdone")} style={{ padding: "5px 10px" }}>
          Not Done
        </button>
      </div>

      <ul style={{ listStyle: "none", marginTop: "20px", padding: 0, width: "350px" }}>
        {filteredTasks.map(task => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#111",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <div>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
                style={{ marginRight: "10px" }}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {task.text}
              </span>
              <span style={{ marginLeft: "10px", color: "#888" }}>
                ({task.due ? new Date(task.due).toLocaleString() : "No due"})
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
