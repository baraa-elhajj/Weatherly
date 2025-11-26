"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SuggestionsList from "@/components/SuggestionsList";
import WeatherCard from "@/components/WeatherCard";

import Toast from "@/utils/Toast";
import { fetchCitySuggestions, fetchWeather } from "@/services/weatherService";
import { useEffect, useRef, useState } from "react";
import { useWeatherContext } from "@/contexts/WeatherContext";

const CITY_LOCAL_STORAGE_KEY = "city";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const { city, setCity } = useWeatherContext();

  // Fetches the last searched city's weather data
  useEffect(() => {
    async function fetchData() {
      const lastCity = localStorage.getItem(CITY_LOCAL_STORAGE_KEY);
      if (lastCity) {
        try {
          const fetchedLastWeatherData = await fetchWeather(lastCity);
          setWeatherData(fetchedLastWeatherData);
        } catch (error) {
          console.error("Server Error:", error.response?.data);
          Toast("error", "Error fetching weather");
        }
      }
    }

    fetchData();
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

      localStorage.setItem(CITY_LOCAL_STORAGE_KEY, city);
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

      localStorage.setItem(
        CITY_LOCAL_STORAGE_KEY,
        `${city.name},${city.country}`
      );
      setCity("");
    } catch (error) {
      console.error("Server Error:", error.response?.data);
      Toast("error", "Error fetching weather");
    }
  };

  return (
    <>
      <Header />

      <SearchBar onSubmit={handleOnSubmit} inputRef={inputRef} />

      <SuggestionsList
        suggestions={suggestions}
        onSelect={(city) => handleOnSelect(city)}
      />

      {weatherData?.main && <WeatherCard data={weatherData} />}
    </>
  );
}
