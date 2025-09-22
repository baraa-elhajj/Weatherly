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
  const [weatherData, setWeatherData] = useState(null);
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

      <div className="relative z-20">
        <SearchBar
          city={city}
          setCity={setCity}
          onSubmit={handleOnSubmit}
          loading={loading}
          inputRef={inputRef}
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
