import axios from "axios";

export const fetchWeather = async (city) => {
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const params = {
    q: city,
    units: "metric",
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
  };

  return await axios.get(url, { params }).then((response) => response.data);
};
