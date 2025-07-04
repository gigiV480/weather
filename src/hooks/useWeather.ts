// hooks/useWeather.ts
import { useEffect, useState } from "react";
import type { WeatherData } from "../types/weather";

const API_KEY = "a37d20a6c02b4834a5f63429250407";
const DEFAULT_CITY = "London";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (query: string) => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=14`
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data: WeatherData = await res.json();
        setWeather(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        fetchWeather(coords);
      },
      () => {
        // If geolocation fails, use default city
        fetchWeather(DEFAULT_CITY);
      }
    );
  }, []);

  return { weather, error };
}
