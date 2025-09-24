"use client";

import SearchBar from "@/components/SearchBar";
import SuggestionsList from "@/components/SuggestionsList";
import WeatherCard from "@/components/WeatherCard";
import { capitalizeFirstLetter } from "@/utils/stringFormatter";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
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
          console.log("getting suggestions for city ", city);
          setSuggestions(response.data);
          console.log("suggestions ", suggestions);
        })
        .catch((error) => {
          console.error("Server Error:", error.response?.data);
          toast.error(
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
      toast.error("You must enter a city!");
      return;
    }

    fetchWeather().finally(() => {
      inputRef.current?.focus();
    });
  };

  const handleOnSelect = (city) => {
    console.log("selected ", city.name);
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

    console.log("fetching weather for ", city);
    setLoading(true);
    await axios
      .get(url, { params })
      .then((response) => {
        setWeatherData(response.data);
        localStorage.setItem("weatherData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Server Error:", error.response?.data);
        toast.error(
          capitalizeFirstLetter(
            error.response?.data?.message || "Error fetching weather"
          )
        );
      });
    setCity("");
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="relative z-20 w-[90%] sm:w-full max-w-md mx-auto ">
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
      </div>

      {weatherData?.main && (
        <div className="absolute inset-0 flex justify-center items-center mt-30">
          <WeatherCard data={weatherData} />
        </div>
      )}
    </div>
  );
}
