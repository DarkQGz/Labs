"use client";

import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Алдаа:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-white">
        <p>Ачаалж байна...</p>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "30px",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}>
        Хэрэглэгчдийн жагсаалт
      </h1>

      {/* Search Input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Хэрэглэгч хайх..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #555",
            backgroundColor: "#111",
            color: "#fff",
            width: "300px",
            outline: "none",
          }}
        />
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "600px", margin: "0 auto" }}>
        {filteredUsers.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>Хэрэглэгч олдсонгүй</p>
        ) : (
          filteredUsers.map((u) => (
            <li
              key={u.id}
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #555",
                backgroundColor: "#111",
                boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
              }}
            >
              <p style={{ fontWeight: "600", marginBottom: "5px" }}>{u.name}</p>
              <p style={{ marginBottom: "5px" }}>{u.email}</p>
              <p style={{ fontSize: "0.9rem", color: "#888" }}>{u.address.city}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
