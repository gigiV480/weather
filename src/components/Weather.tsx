import { useState } from "react";
import WeatherDay from "./WeatherDay";
import WeatherDisplay from "./WeatherDisplay";
import Converter from "./Converter";
import classes from "./Weather.module.css";

const Weather = () => {
  const [showHourly, setShowHourly] = useState(false);

  const toggleShowHourly = () => setShowHourly((prev) => !prev);

  return (
    <div className={classes.container}>
      <div className={classes.day}>
        {/* Pass toggle function to WeatherDay so it can trigger "See All" */}
        <WeatherDay onSeeAllClick={toggleShowHourly} />
      </div>
      <div className={classes.display}>
        {/* Show either hourly or daily based on state */}
        <WeatherDisplay showHourly={showHourly} onBack={toggleShowHourly} />
      </div>
      <div className={classes.converter}>
        <Converter />
      </div>
    </div>
  );
};

export default Weather;
