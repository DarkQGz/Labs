"use client";

import { useState } from "react";
import Link from "next/link";

export default function SidebarNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          background: "#222222ff",
          boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 1002,
          padding: "20px",
        }}
      >
        <button onClick={() => setIsOpen(false)} style={{ fontSize: "24px", marginBottom: "20px" }}>
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
        </nav>
      </div>
    </>
  );
}
