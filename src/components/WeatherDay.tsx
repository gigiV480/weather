import { useWeather } from "../context/WeatherContext";
import classes from "./WeatherDay.module.css";

type WeatherDayProps = {
  onSeeAllClick: () => void;  // Add this prop to notify parent on button click
};

export const WeatherDay = ({ onSeeAllClick }: WeatherDayProps) => {
  const { weather, tempUnit } = useWeather();
  const today = weather?.forecast.forecastday[0];

  if (!today) return null;

  const currentHourIndex = new Date(weather.location.localtime).getHours();

  const currentHourWeather = today.hour[currentHourIndex];

  const nextHours = today.hour.slice(currentHourIndex + 1, currentHourIndex + 6);

  const prettyDate: string = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const currentTemp =
    tempUnit === "C" ? currentHourWeather?.temp_c : currentHourWeather?.temp_f;

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>{weather.location.name}</h1>
        <h3>{prettyDate}</h3>
        {currentHourWeather && (
          <>
            <p>{currentHourWeather.time.split(" ")[1]}</p>
            <div className={classes.topWeather}>
              <img
                src={currentHourWeather.condition.icon}
                alt={currentHourWeather.condition.text}
              />
              <p className={classes.temp}>
                {currentTemp}°{tempUnit}
              </p>
            </div>
          </>
        )}
      </div>

      <div className={classes.weathers}>
        {nextHours.map((hour) => {
          const temp = tempUnit === "C" ? hour.temp_c : hour.temp_f;
          return (
            <div key={hour.time} className={classes.weather}>
              <p style={{ fontWeight: "bold" }}>{hour.time.split(" ")[1]}</p>
              <div className={classes.topWeather}>
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <p className={classes.temp}>
                  {temp}°{tempUnit}
                </p>
              </div>
              <p>{hour.condition.text}</p>
            </div>
          );
        })}

        {/* Only change: call onSeeAllClick on button click */}
        <button className={classes.button} onClick={onSeeAllClick}>
          See All
        </button>
      </div>
    </div>
  );
};

export default WeatherDay;
