"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://iproneedful.mandakh.org/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      // 8110 = success
      if (data.resultCode === 8110) {
        const user = data.data[0];

        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
        return;
      }

      // Error from backend
      setError(data.resultMessage || "Алдаа гарлаа!");
    } catch (err) {
      console.error(err);
      setError("Сервертэй холбогдож чадсангүй!");
    }
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
