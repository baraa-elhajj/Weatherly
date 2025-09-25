"use client";

import Toast from "@/utils/Toast";
import SearchBar from "@/components/SearchBar";
import SuggestionsList from "@/components/SuggestionsList";
import WeatherCard from "@/components/WeatherCard";
import Menu from "@/components/Menu";
import Logo from "@/components/Logo";

import { capitalizeFirstLetter } from "@/utils/stringFormatter";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [savedCities, setSavedCities] = useState([]);
  const inputRef = useRef(null);

  const url = `https://api.openweathermap.org/data/2.5/weather`;
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
    const savedCitiesList = localStorage.getItem("savedCities");
    if (savedCitiesList) {
      setSavedCities(JSON.parse(savedCitiesList));
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!city || city === "") {
      Toast("error", "You must enter a city!");
      return;
    }

    fetchWeather();
  };

  const handleOnSelect = (city) => {
    setCity(() => city.name);
    setSuggestions([]);
    fetchWeather(`${city.name},${city.country}`);
  };

  const fetchWeather = async (selectedCity) => {
    const cityToFetch = selectedCity || city;
    if (!cityToFetch) return;

    const params = {
      q: cityToFetch,
      units: "metric",
      appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
    };

    setLoading(true);
    await axios
      .get(url, { params })
      .then((response) => {
        setWeatherData(response.data);
        localStorage.setItem("weatherData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Server Error:", error.response?.data);
        Toast(
          "error",
          capitalizeFirstLetter(
            error.response?.data?.message || "Error fetching weather"
          )
        );
      });
    setCity("");
    setLoading(false);
  };

  return (
    <>
      <Logo />
      <Menu />

      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <SearchBar
        city={city}
        setCity={setCity}
        onSubmit={handleOnSubmit}
        loading={loading}
        inputRef={inputRef}
      />

      <SuggestionsList
        suggestions={suggestions}
        onSelect={(city) => handleOnSelect(city)}
      />

      {weatherData?.main && (
        <WeatherCard
          data={weatherData}
          savedCities={savedCities}
          setSavedCities={setSavedCities}
        />
      )}
    </>
  );
}
