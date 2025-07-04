import { useWeather } from "../context/WeatherContext";
import { formatDatePretty } from "../types/weather";
import classes from "./WeatherDisplay.module.css";

type WeatherDisplayProps = {
  showHourly: boolean;
  onBack: () => void;
};

const WeatherDisplay = ({ showHourly, onBack }: WeatherDisplayProps) => {
  const { weather, daysToShow, setDaysToShow, tempUnit } = useWeather();

  if (!weather) return null;

  if (showHourly) {
    const today = weather.forecast.forecastday[0];
    const nextDay = weather.forecast.forecastday[1];
    const currentHourIndex = new Date(weather.location.localtime).getHours();

    let hours = today.hour.slice(currentHourIndex);

    if (hours.length < 15 && nextDay) {
      hours = [...hours, ...nextDay.hour.slice(0, 15 - hours.length)];
    }

    return (
      <div>
        <div className={classes.weatherCont}>
          {hours.map((hour) => {
            const temp = tempUnit === "C" ? hour.temp_c : hour.temp_f;
            return (
              <div key={hour.time} className={classes.hourly}>
                <p style={{ fontWeight: "bold" }}>{hour.time.split(" ")[1]}</p>
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <p>
                  {temp}°{tempUnit}
                </p>
                <p>{hour.condition.text}</p>
              </div>
            );
          })}
          <div className={classes.togglers}>
            <button className={classes.buttona} onClick={onBack}>
              Back to Days
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Daily display
  const handleToggle = (days: number) => {
    setDaysToShow(days);
  };

  return (
    <div>
      <div className={classes.weatherCont}>
        {weather.forecast.forecastday.slice(0, daysToShow).map((day) => {
          const minTemp =
            tempUnit === "C" ? day.day.mintemp_c : day.day.mintemp_f;
          const maxTemp =
            tempUnit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f;

          return (
            <div key={day.date}>
              <p>{formatDatePretty ? formatDatePretty(day.date) : day.date}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <div className={classes.minmax}>
                <p>
                  {minTemp}°{tempUnit}
                </p>
                <p>
                  {maxTemp}°{tempUnit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.togglers}>
        {[5, 10, 14].map((num) => (
          <button
            key={num}
            className={`${classes.button} ${
              daysToShow === num ? classes.active : ""
            }`}
            onClick={() => handleToggle(num)}
            disabled={daysToShow === num}
          >
            {num} Days
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
