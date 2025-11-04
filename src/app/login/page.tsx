"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      setError("Имэйл эсвэл нууц үг буруу байна!");
      return;
    }

    localStorage.setItem("user", email);
    router.push("/");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "none", background: "#111", color: "#fff" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "none", background: "#111", color: "#fff" }}
        />
        {error && <p style={{ color: "#f55" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
