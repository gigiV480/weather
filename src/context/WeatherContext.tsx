import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { WeatherData } from "../types/weather";

const API_KEY = "a37d20a6c02b4834a5f63429250407";
const DEFAULT_CITY = "Tbilisi";

type TempUnit = "C" | "F";

type WeatherContextType = {
  weather: WeatherData | null;
  error: string | null;
  fetchWeather: (query: string, days?: number) => void; // ✅ Allow optional second arg
  daysToShow: number;
  setDaysToShow: (days: number) => void;
  tempUnit: "C" | "F";
  toggleTempUnit: () => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [daysToShow, setDaysToShow] = useState<number>(5);
  const [tempUnit, setTempUnit] = useState<TempUnit>("C");

  // Always fetch 14 days on initial load or city change
  const fetchWeather = async (query: string, days = daysToShow) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${days}`
      );
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error("Please enter a valid city name.");
        }
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData = await res.json();
      setWeather(data);
      setError(null); // ✅ clear previous error
    } catch (err) {
      setError((err as Error).message);
      // setWeather(null);
    }
  };

  useEffect(() => {
    const days = 14; // always fetch full data set
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        fetchWeather(coords, days);
      },
      () => {
        fetchWeather(DEFAULT_CITY, days);
      }
    );
  }, []);
  

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        error,
        daysToShow,
        setDaysToShow,
        tempUnit,
        toggleTempUnit,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
