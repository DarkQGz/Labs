"use client";

import { useState } from "react";

export default function CalcGame() {
  const [value, setValue] = useState(0);

  const handleClick = (operator: string) => {
    setValue((prev) => {
      let newVal;
      switch (operator) {
        case "+":
          newVal = prev + 1;
          break;
        case "-":
          newVal = prev - 1;
          break;
        case "×":
          newVal = prev * 2;
          break;
        case "/":
          newVal = Math.floor(prev / 2);
          break;
        default:
          newVal = prev;
      }
      return newVal < 0 ? 0 : newVal;
    });
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          fontSize: "2rem",
          margin: "20px",
          border: "2px solid #333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          background: "#111",
          boxShadow: "0 0 12px rgba(255,255,255,0.05)",
        }}
      >
        {value}
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {["+", "-", "×", "/"].map((op) => (
          <button
            key={op}
            onClick={() => handleClick(op)}
            style={{
              padding: "15px 30px",
              fontSize: "1.5rem",
              borderRadius: "10px",
              cursor: "pointer",
              border: "1px solid #444",
              background: "#fff",
              color: "#000",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#ccc";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#fff";
            }}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
