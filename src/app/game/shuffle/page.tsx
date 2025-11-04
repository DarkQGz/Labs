"use client";

import { useState, useEffect } from "react";

const IMAGES = [
  "/images/shuffle/1.jpg",
  "/images/shuffle/2.jpg",
  "/images/shuffle/3.jpg",
  "/images/shuffle/4.jpg",
  "/images/shuffle/5.jpg",
  "/images/shuffle/6.jpg",
  "/images/shuffle/7.jpg",
  "/images/shuffle/8.jpg",
  "/images/shuffle/9.jpg",
];

export default function ShuffleGame() {
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const shuffled = [...IMAGES].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
  }, []);

  useEffect(() => {
    if (tiles.length && tiles.every((src, i) => src === IMAGES[i])) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  }, [tiles]);

  function handleClick(index: number) {
    if (selected === null) {
      setSelected(index);
      return;
    }
    const newTiles = [...tiles];
    [newTiles[selected], newTiles[index]] = [newTiles[index], newTiles[selected]];
    setTiles(newTiles);
    setSelected(null);
  }

  return (
    <div
      style={{
        textAlign: "center",
        background: "#000",
        color: "#fff",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", letterSpacing: "1px" }}>Shuffle Game</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 120px)",
          gridGap: "5px",
        }}
      >
        {tiles.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Tile ${i}`}
            onClick={() => handleClick(i)}
            style={{
              width: "120px",
              height: "120px",
              border:
                selected === i ? "3px solid #fff" : "2px solid #333",
              cursor: "pointer",
              borderRadius: "10px",
              transition: "transform 0.2s, border 0.2s",
              transform: selected === i ? "scale(1.05)" : "scale(1)",
              filter: isSolved ? "grayscale(0%)" : "grayscale(30%)",
            }}
          />
        ))}
      </div>

      {isSolved && (
        <h2 style={{ marginTop: "20px", color: "#ccc", fontWeight: "normal" }}>
          🎉 Congratulations!
        </h2>
      )}

      <button
        onClick={() => {
          const shuffled = [...IMAGES].sort(() => Math.random() - 0.5);
          setTiles(shuffled);
          setIsSolved(false);
        }}
        style={{
          marginTop: "25px",
          background: "#fff",
          color: "#000",
          border: "1px solid #444",
          borderRadius: "50px",
          padding: "10px 25px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "0.3s",
          fontWeight: "bold",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#ccc";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#fff";
        }}
      >
        Shuffle Again
      </button>
    </div>
  );
}
