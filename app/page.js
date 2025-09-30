"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SuggestionsList from "@/components/SuggestionsList";
import WeatherCard from "@/components/WeatherCard";

import Toast from "@/utils/Toast";
import { fetchCitySuggestions, fetchWeather } from "@/services/weatherService";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

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
      try {
        const citySuggestions = await fetchCitySuggestions(city);
        setSuggestions(citySuggestions);
      } catch (error) {
        console.error("Server Error:", error.response?.data.message);
        Toast("error", "Error fetching cities");
      }
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

      {/* TODO: Move city/setCity to context */}
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
