import { useState } from "react";

export default function useWeatherAPI() {
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    if (!city || typeof city !== "string") {
      return "⚠️ Please enter a valid city name.";
    }

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("Missing API key. Add VITE_WEATHER_API_KEY in .env");
      }

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message || "Unknown error");
      }

      return `🌤️ Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (err) {
      return `❌ Could not fetch weather: ${err.message}`;
    } finally {
      setLoading(false);
    }
  };

  return { fetchWeather, loading };
}
