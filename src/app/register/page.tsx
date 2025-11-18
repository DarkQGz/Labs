"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) return setError("Имэйл буруу байна!");
    if (password.length < 6) return setError("Нууц үг хамгийн багадаа 6 тэмдэгт!");
    if (password !== confirm) return setError("Нууц үг таарахгүй байна!");

    try {
      const res = await fetch("http://iproneedful.mandakh.org/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      // 8010 = success
      if (data.resultCode === 8010) {
        router.push("/login");
        return;
      }

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
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", background: "#111", color: "#fff", border: "none" }}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", background: "#111", color: "#fff", border: "none" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", background: "#111", color: "#fff", border: "none" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", background: "#111", color: "#fff", border: "none" }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", background: "#111", color: "#fff", border: "none" }}
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
          Register
        </button>
      </form>
    </div>
  );
}
