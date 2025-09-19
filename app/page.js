"use client";
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=dubai&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      console.log(response.data);
    });
    setCity("");
    setLoading(false);
  };

  return (
    <div>
      <Image
        src="/background.jpg"
        alt="Background Image"
        layout="fill"
        className="object-cover"
      />
      {/* Image overlay */}
      <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
