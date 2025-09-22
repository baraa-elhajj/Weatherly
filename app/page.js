"use client";

import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { capitalizeFirstLetter } from "@/utils/stringFormatter";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
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

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const params = {
    q: city,
    units: "metric",
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
  };

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

  const fetchWeather = async () => {
    setLoading(true);
    await axios
      .get(url, { params })
      .then((response) => {
        setWeatherData(response.data);
        localStorage.setItem("weatherData", JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Server Error:", error.response.data);
        toast.error(capitalizeFirstLetter(error.response.data.message));
      });

    setCity("");
    setLoading(false);
  };

  return (
    <div>
      <Image
        src="/background.jpg"
        alt="Background Image"
        fill
        className="object-cover"
      />
      {/* Image overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <SearchBar
        city={city}
        setCity={setCity}
        onSubmit={handleOnSubmit}
        loading={loading}
        inputRef={inputRef}
      />

      {weatherData?.main && <WeatherCard data={weatherData} />}
    </div>
  );
}
