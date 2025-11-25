"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!user) return null; // Wait for user to load

  const cards = [
    { title: "Shuffle Game", href: "/game/shuffle" },
    { title: "Calculator", href: "/game/calc" },
    { title: "To-do List", href: "/game/todo" },
  ];

  const otherCards = [
    { title: "Users", href: "/users" },
    { title: "Weather", href: "/weather" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ padding: "20px", borderBottom: "1px solid #333" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Naranbaatar's Dashboard</h1>
        <p style={{ margin: "5px 0 0 0", color: "#aaa" }}>
          {user.name || user.email}
        </p>
      </header>

      {/* Main content */}
      <main style={{ padding: "30px" }}>
        {/* Games section */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#ccc" }}>Games</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {cards.map((c, i) => (
              <DashboardCard key={i} title={c.title} href={c.href} />
            ))}
          </div>
        </section>

        {/* Other tools section */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#ccc" }}>Other Tools</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {otherCards.map((c, i) => (
              <DashboardCard key={i} title={c.title} href={c.href} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* Reusable Card Component */
function DashboardCard({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "180px",
        height: "120px",
        background: "#111",
        border: "2px solid #fff",
        borderRadius: "12px",
        textDecoration: "none",
        color: "#fff",
        fontSize: "1.1rem",
        fontWeight: "bold",
        transition: "all 0.2s",
      }}
    >
      {title}
    </Link>
  );
}
