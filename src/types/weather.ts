export type Condition = {
  text: string;
  icon: string;
  code: number;
};

export type HourlyWeather = {
  time: string;
  temp_c: number;
  temp_f?: number;        // <-- add optional temp_f
  condition: Condition;
  // add other fields if needed
};

export type DayWeather = {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxtemp_f?: number;      // <-- add optional maxtemp_f
  mintemp_f?: number;      // <-- add optional mintemp_f
  avgtemp_f?: number;
  condition: Condition;
  // add other fields if needed
};

export type ForecastDay = {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    mintemp_f: number;
    maxtemp_f: number;
    condition: {
      icon: string;
      text: string;
    };
  };
  hour: Hour[]
};


export type Location = {
  name: string;
  lat: number;
  lon: number;
  localtime: string; // e.g., "2025-07-04 14:00"
};

export type WeatherData = {
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
  // add other fields if needed
};


export const formatDatePretty = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",    // Friday
    month: "long",      // July
    day: "numeric",     // 4
  });
};


export type Hour = {
  time: string;      // e.g. "2025-07-04 14:00"
  temp_c: number;
  temp_f: number;
  condition: Condition;
  // add other props as needed
};

export type Day = {
  mintemp_c: number;
  maxtemp_c: number;
  mintemp_f: number;
  maxtemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  condition: Condition;
};


export interface WeatherDayProps {
  showAllHours?: boolean;
  onSeeAll?: () => void;
  onBack?: () => void;
}