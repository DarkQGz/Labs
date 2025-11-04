"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SidebarNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Load login status from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setIsLoggedIn(true);
        setUsername(parsed.name || parsed.email || "");
      } catch (err) {
        console.warn("Invalid user data in localStorage:", user);
        // fallback if user was stored as plain string
        setIsLoggedIn(true);
        setUsername(user);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    setIsOpen(false);
    window.location.href = "/"; // optional redirect
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1001,
          fontSize: "24px",
          padding: "10px",
          background: "none",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.3)",
          display: isOpen ? "block" : "none",
          zIndex: 1000,
        }}
      ></div>

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "250px",
          height: "100%",
          background: "#222",
          boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 1002,
          padding: "20px",
          color: "white",
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            color: "white",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/blog/1" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/game/shuffle" onClick={() => setIsOpen(false)}>Shuffle</Link>
          <Link href="/game/calc" onClick={() => setIsOpen(false)}>Calc</Link>
          <Link href="/game/todo" onClick={() => setIsOpen(false)}>To-do</Link>
          <Link href="/users" onClick={() => setIsOpen(false)}>Users</Link>
          <hr style={{ borderColor: "#555", margin: "15px 0" }} />

          {!isLoggedIn ? (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <>
              <p style={{ margin: 0 }}>{username}</p>
              <button
                onClick={handleLogout}
                style={{
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
