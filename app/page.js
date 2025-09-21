"use client";

import WeatherCard from "@/components/WeatherCard";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const params = {
    q: city,
    units: "metric",
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!city || city === "") {
      alert("You must enter a city");
      return;
    }
    fetchWeather();
  };

  const fetchWeather = async () => {
    setLoading(true);
    await axios
      .get(url, { params })
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
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

      {/* Search section */}
      <div className="absolute inset-0 flex justify-center items-start pt-10">
        <form
          onSubmit={handleOnSubmit}
          className="flex items-center w-[90%] sm:w-full max-w-md bg-transparent backdrop-blur-xl rounded-full shadow-lg p-2 border border-white/20"
        >
          <input
            type="text"
            placeholder="Search for a city"
            className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-2 focus:outline-none"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-white/20 text-white shadow-md transition-all hover:bg-white/30 hover:scale-105 active:scale-95"
          >
            <BsSearch className="text-xl" />
          </button>
        </form>
      </div>

      {weatherData?.main && <WeatherCard data={weatherData} />}
    </div>
  );
}
