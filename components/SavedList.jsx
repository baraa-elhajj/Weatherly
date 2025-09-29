import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import { fetchWeather } from "@/services/weatherService";
import { useWeatherContext } from "@/contexts/WeatherContext";

export default function SavedList() {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { savedCities } = useWeatherContext();

  useEffect(() => {
    if (savedCities) {
      console.log("savedCities: ", savedCities);
      const fetchAllWeather = async () => {
        setLoading(true);
        const data = await Promise.all(
          savedCities.map((city) => fetchWeather(city))
        );
        console.log("data ", data);
        setWeatherDataList(data);
        setLoading(false);
      };

      fetchAllWeather();
    } else {
      setLoading(false);
    }
  }, [savedCities]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-15 h-15 sm:w-20 sm:h-20 border-4 border-blue-300 border-t-transparent rounded-full animate-spin mb-70" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-15 sm:mt-30 flex flex-wrap gap-x-4 gap-y-40 max-h-screen">
        {weatherDataList.length > 0 ? (
          weatherDataList.map((weatherData) => (
            <div key={weatherData.id} className="scale-70 min-w-[150px] flex-1">
              <WeatherCard simplified={true} data={weatherData} />
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
