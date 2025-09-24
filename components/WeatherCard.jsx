import { getCurrentFormattedDateAlpha } from "@/utils/dateFormatter";
import { WiHumidity } from "react-icons/wi";
import { LuWind, LuThermometer } from "react-icons/lu";
import { getIconSrc } from "@/utils/customWeatherIcon";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

export default function WeatherCard({ data }) {
  const iconSrc = getIconSrc(data.weather?.[0]);

  return (
    <div className="bg-blue-300/40 rounded-3xl shadow-2xl w-[90%] sm:w-96 mx-auto p-4 sm:p-6 text-white transform transition-all hover:scale-[1.02] hover:bg-blue-300/50">
      <div className="flex justify-end">
        <button className="transform transition-all hover:scale-110 cursor-pointer">
          <GoBookmark size="20" />
        </button>
      </div>

      <div className="text-center mb-4 sm:mb-6">
        <div className="flex flex-row items-center justify-center gap-1">
          <h2 className="text-4xl font-bold">{data.name}</h2>
          <div className="text-xs bg-white/20 rounded-xl px-1 pt-1 pb-0.5 mt-1.5">
            {data.sys.country}
          </div>
        </div>
        <p className="text-xs sm:text-sm opacity-80">
          {getCurrentFormattedDateAlpha()}
        </p>
      </div>

      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <span className="text-5xl sm:text-7xl font-extrabold">
          {Math.round(data.main.temp)}°C
        </span>
        <img
          src={iconSrc}
          alt={data.weather[0].description}
          className="w-16 h-16 sm:w-24 sm:h-24 my-2"
        />
        <p className="text-lg sm:text-xl mt-1 sm:mt-2 capitalize font-semibold">
          {data.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center text-xs sm:text-sm">
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-2 sm:p-3">
          <WiHumidity className="text-xl sm:text-2xl mb-1" />
          <span className="font-semibold">Humidity</span>
          <span>{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-2 sm:p-3">
          <LuWind className="text-xl sm:text-2xl mb-1" />
          <span className="font-semibold">Wind</span>
          <span>{data.wind.speed} m/s</span>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-xl p-2 sm:p-3">
          <LuThermometer className="text-xl sm:text-2xl mb-1" />
          <span className="font-semibold">Feels</span>
          <span>{Math.round(data.main.feels_like)}°C</span>
        </div>
      </div>
    </div>
  );
}
