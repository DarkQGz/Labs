"use client";

import { useState, useEffect } from "react";

interface GeoCity {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface Weather {
  temp: number;
  feels_like: number;
  description: string;
  wind: number;
  humidity: number;
}

const API_KEY = "006a34285b376b614ae05d0a47b73eee";

export default function WeatherPage() {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<GeoCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<GeoCity | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather({ name: "Ulaanbaatar", lat: 47.9210, lon: 106.9186, country: "MN" });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`
      );
      const data: GeoCity[] = await res.json();

      if (!data.length) {
        setError("Хот олдсонгүй!");
        setCities([]);
        return;
      }

      setError("");
      setCities(data);
      setSelectedCity(null);
      setWeather(null);
    } catch (err) {
      console.error(err);
      setError("Алдаа гарлаа!");
    }
  };

  const fetchWeather = async (city: GeoCity) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("Цаг агаар авах боломжгүй!");
        setWeather(null);
        return;
      }

      setSelectedCity(city);
      setWeather({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        wind: data.wind.speed,
        humidity: data.main.humidity,
      });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Цаг агаар авах боломжгүй!");
      setWeather(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.3s ease",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Weather Forecast</h1>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            background: "#111",
            color: "#fff",
            transition: "all 0.2s ease",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: "#fff",
            color: "#000",
            transition: "all 0.2s ease",
          }}
        >
          Хайх
        </button>
      </form>

      {/* Show matching cities */}
      {cities.length > 0 && !selectedCity && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
          {cities.map((c, idx) => (
            <button
              key={idx}
              onClick={() => fetchWeather(c)}
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #fff",
                cursor: "pointer",
                background: "#111",
                color: "#fff",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#222")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#111")
              }
            >
              {c.name}, {c.state ? c.state + ", " : ""}{c.country}
            </button>
          ))}
        </div>
      )}

      {error && <p style={{ color: "#ff5555", marginTop: "10px" }}>{error}</p>}

      {/* Weather card */}
      {weather && selectedCity && (
        <div
          style={{
            padding: "20px",
            background: "#111",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "20px",
            minWidth: "250px",
            transition: "all 0.3s ease",
          }}
        >
          <h2 style={{ fontSize: "1.5rem" }}>
            {selectedCity.name}, {selectedCity.country}
          </h2>
          <p style={{ fontSize: "3rem", margin: "10px 0" }}>
            {Math.round(weather.temp)}°C
          </p>
          <p style={{ marginBottom: "5px" }}>{weather.description}</p>
          <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
            Feels like {Math.round(weather.feels_like)}°C | Wind: {weather.wind} m/s | Humidity: {weather.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}
