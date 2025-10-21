"use client";

import { useState } from "react";

export default function CalcGame() {
  const [value, setValue] = useState(0);

  const handleClick = (operator: string) => {
    setValue(prev => {
      let newVal;
      switch (operator) {
        case "+": newVal = prev + 1; break;
        case "-": newVal = prev - 1; break;
        case "×": newVal = prev * 2; break;
        case "/": newVal = Math.floor(prev / 2); break;
        default: newVal = prev;
      }
      return newVal < 0 ? 0 : newVal;
    });
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "#000",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      
      <div style={{
        width: "80px",
        height: "80px",
        fontSize: "2rem",
        margin: "20px",
        border: "2px solid #00ff88",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        background: "#111"
      }}>
        {value}
      </div>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
        {["+", "-", "×", "/"].map(op => (
          <button
            key={op}
            onClick={() => handleClick(op)}
            style={{
              padding: "15px 25px",
              fontSize: "1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              background: "#00ff88",
              color: "#000"
            }}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}
