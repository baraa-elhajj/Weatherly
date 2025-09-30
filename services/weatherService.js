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

export const fetchCitySuggestions = async (input) => {
  if (!input) return;

  const citiesUrl = `https://api.openweathermap.org/geo/1.0/direct`;
  const citiesParams = {
    q: input,
    limit: 5,
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
  };

  return await axios
    .get(citiesUrl, { params: citiesParams })
    .then((response) => response.data);
};
