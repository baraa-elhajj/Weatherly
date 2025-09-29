"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SuggestionsList from "@/components/SuggestionsList";
import WeatherCard from "@/components/WeatherCard";

import Toast from "@/utils/Toast";
import { capitalizeFirstLetter } from "@/utils/stringFormatter";
import { fetchWeather } from "@/services/weatherService";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const citiesUrl = `https://api.openweathermap.org/geo/1.0/direct`;
  const citiesParams = {
    q: city,
    limit: 5,
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
  };

  useEffect(() => {
    const savedWeatherData = localStorage.getItem("weatherData");
    if (savedWeatherData) {
      setWeatherData(JSON.parse(savedWeatherData));
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!city) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      // TODO: move to weatherService.js
      await axios
        .get(citiesUrl, { params: citiesParams })
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Server Error:", error.response?.data);
          Toast(
            "error",
            capitalizeFirstLetter(
              error.response?.data?.message || "Error fetching cities"
            )
          );
        });
    }, 300); // Debounce API calls for 300ms

    return () => clearTimeout(timeout);
  }, [city]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!city || city === "") {
      Toast("error", "You must enter a city!");
      return;
    }

    try {
      const fetchedWeatherData = await fetchWeather(city);
      setWeatherData(fetchedWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(fetchedWeatherData));
      setCity("");
    } catch (error) {
      console.error("Server Error:", error.response?.data);
      Toast("error", "Error fetching weather");
    }
  };

  const handleOnSelect = async (city) => {
    setCity(() => city.name);
    setSuggestions([]);

    try {
      const fetchedWeatherData = await fetchWeather(
        `${city.name},${city.country}`
      );
      setWeatherData(fetchedWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(fetchedWeatherData));
      setCity("");
    } catch (error) {
      console.error("Server Error:", error.response?.data);
      Toast("error", "Error fetching weather");
    }
  };

  return (
    <>
      <Header />

      <SearchBar
        city={city}
        setCity={setCity}
        onSubmit={handleOnSubmit}
        inputRef={inputRef}
      />

      <SuggestionsList
        suggestions={suggestions}
        onSelect={(city) => handleOnSelect(city)}
      />

      {weatherData?.main && <WeatherCard data={weatherData} />}
    </>
  );
}
