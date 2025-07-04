import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import classes from "./Header.module.css";

const Header = () => {
  const { fetchWeather, error } = useWeather();
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city.trim());
      setCity("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>Weatheri</h1>
      <h2 className={classes.subtitle}>Your local weather, anywhere</h2>

      <div className={classes.searchBox}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          className={classes.input}
        />
        <button
          onClick={handleSearch}
          className={classes.button}
          disabled={!city.trim()}
        >
          Search
        </button>
      </div>

      {error && <p className={classes.error}>{error}</p>}
    </header>
  );
};

export default Header;
