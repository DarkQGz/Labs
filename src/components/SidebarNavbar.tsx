"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SidebarNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  // Load login status from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsLoggedIn(true);
        setUser(parsed);
      } catch {
        // ignore invalid JSON
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsOpen(false);
    window.location.href = "/";
  };

  // If not logged in, render nothing
  if (!isLoggedIn) return null;

  return (
    <>
      {/* Open sidebar button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1001,
          fontSize: "24px",
          padding: "10px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* Overlay */}
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

      {/* Sidebar */}
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
          {/* Main Links */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="/blog/1" onClick={() => setIsOpen(false)}>
            Blog
          </Link>

          <hr style={{ borderColor: "#555", margin: "10px 0" }} />

          {/* Games group */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong>Games</strong>
            <Link href="/game/shuffle" onClick={() => setIsOpen(false)}>
              Shuffle
            </Link>
            <Link href="/game/calc" onClick={() => setIsOpen(false)}>
              Calc
            </Link>
            <Link href="/game/todo" onClick={() => setIsOpen(false)}>
              To-do
            </Link>
          </div>

          <hr style={{ borderColor: "#555", margin: "10px 0" }} />

          {/* Users and Weather group */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong>Other</strong>
            <Link href="/users" onClick={() => setIsOpen(false)}>
              Users
            </Link>
            <Link href="/weather" onClick={() => setIsOpen(false)}>
              Weather
            </Link>
          </div>

          <hr style={{ borderColor: "#555", margin: "10px 0" }} />

          {/* Auth section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p>{user?.name || user?.email}</p>
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
          </div>
        </nav>
      </div>
    </>
  );
}
