// src/components/Weather.js
import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "ac362305553d8a9223701ce6b6faee2c";

  const fetchWeather = async () => {
    if (!city) return setError("Please enter a city");
    setError("");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(res.data);
    } catch {
      setError("City not found");
      setWeather(null);
    }
  };

  // Dynamic background based on weather
  const getBackground = () => {
    if (!weather) return "linear-gradient(to bottom, #74ebd5, #ACB6E5)";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    if (main.includes("rain") || main.includes("drizzle")) return "linear-gradient(to bottom, #4e54c8, #8f94fb)";
    if (main.includes("clear")) return "linear-gradient(to bottom, #f7971e, #ffd200)";
    if (main.includes("snow")) return "linear-gradient(to bottom, #e0eafc, #cfdef3)";
    if (main.includes("storm") || main.includes("thunder")) return "linear-gradient(to bottom, #141e30, #243b55)";
    return "linear-gradient(to bottom, #74ebd5, #ACB6E5)";
  };

  return (
    <div style={{ ...styles.container, background: getBackground() }}>
      <div style={styles.card}>
        <h1 style={styles.title}>Weather App</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <button onClick={fetchWeather} style={styles.button}>
            Search
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={styles.weatherBox}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather icon"
              style={styles.icon}
            />
            <h2 style={styles.city}>
              {weather.name}, {weather.sys.country}
            </h2>
            <p style={styles.desc}>{weather.weather[0].description}</p>
            <p style={styles.temp}>{Math.round(weather.main.temp)}°C</p>
            <p style={styles.info}>Humidity: {weather.main.humidity}%</p>
            <p style={styles.info}>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background 0.5s ease",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
  },
  title: { fontSize: "2rem", marginBottom: "20px", fontFamily: "'Segoe UI', sans-serif" },
  inputContainer: { display: "flex", marginBottom: "20px", flexWrap: "wrap" },
  input: {
    flex: "1 1 60%",
    padding: "12px 15px",
    borderRadius: "10px 0 0 10px",
    border: "1px solid #ccc",
    outline: "none",
    minWidth: "180px",
    fontSize: "1rem",
  },
  button: {
    flex: "1 1 35%",
    padding: "12px 15px",
    borderRadius: "0 10px 10px 0",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    minWidth: "100px",
    marginTop: "5px",
  },
  weatherBox: { marginTop: "20px" },
  icon: { width: "120px", height: "120px" },
  city: { fontSize: "1.5rem", margin: "10px 0" },
  desc: { fontSize: "1.1rem", textTransform: "capitalize", margin: "5px 0" },
  temp: { fontSize: "2rem", fontWeight: "bold", margin: "10px 0" },
  info: { margin: "3px 0", fontSize: "1rem" },
  error: { color: "red", marginTop: "10px" },
};

export default Weather;
