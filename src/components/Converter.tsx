import { useWeather } from "../context/WeatherContext";
import classes from "./Converter.module.css";

const Converter = () => {
  const { tempUnit, toggleTempUnit } = useWeather();

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        disabled={tempUnit === "C"}
        onClick={() => tempUnit !== "C" && toggleTempUnit()}
        aria-pressed={tempUnit === "C"}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button
        className={classes.button}
        disabled={tempUnit === "F"}
        onClick={() => tempUnit !== "F" && toggleTempUnit()}
        aria-pressed={tempUnit === "F"}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default Converter;
