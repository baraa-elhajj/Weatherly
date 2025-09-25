import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { fetchWeather } from "@/services/weatherService";

export default function SavedList() {
  const [savedCities, setSavedCities] = useState([]);
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCities = localStorage.getItem("savedCities");
    if (savedCities) {
      const cities = JSON.parse(savedCities);
      setSavedCities(cities);

      const fetchAllWeather = async () => {
        setLoading(true);
        const data = await Promise.all(
          cities.map((city) => fetchWeather(city))
        );
        console.log("data ", data);
        setWeatherDataList(data);
        setLoading(false);
      };

      fetchAllWeather();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="mt-15 sm:mt-30 flex flex-wrap gap-x-4 gap-y-40 max-h-screen overflow-y-auto md:overflow-visible md:max-h-none snap-y snap-mandatory">
        {weatherDataList.length > 0 ? (
          weatherDataList.map((weatherData) => (
            <div key={weatherData.id} className="scale-70 min-w-[150px] flex-1">
              <WeatherCard
                simplified={true}
                data={weatherData}
                savedCities={savedCities}
                setSavedCities={setSavedCities}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-300 text-lg">
            No bookmarks yet.
          </div>
        )}
      </div>
    </>
  );
}
