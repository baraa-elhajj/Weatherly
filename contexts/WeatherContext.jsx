"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SAVED_CITIES_LOCAL_STORAGE_KEY } from "@/constants";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    const savedCitiesLocal = localStorage.getItem(
      SAVED_CITIES_LOCAL_STORAGE_KEY
    );
    console.log("savedCitiesLocal: ", savedCitiesLocal);
    if (savedCitiesLocal) {
      const cities = JSON.parse(savedCitiesLocal);
      console.log("cities: ", cities);
      setSavedCities(cities);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{ savedCities, setSavedCities, city, setCity }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeatherContext = () => useContext(WeatherContext);
