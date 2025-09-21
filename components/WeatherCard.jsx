import { getCurrentFormattedDateAlpha } from "@/utils/dateFormatter";

export default function WeatherCard({ data }) {
  return (
    <div className="flex justify-center items-center mt-50">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-[90%] sm:w-96 border border-white/30 text-white">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-sm opacity-80">{getCurrentFormattedDateAlpha()}</p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-6xl font-bold">
            {Math.round(data.main.temp)}°C
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <p className="text-lg mt-2 capitalize">
            {data.weather[0].description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
          <div className="flex flex-col">
            <span className="font-semibold">Humidity</span>
            <span>{data.main.humidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Wind</span>
            <span>{data.wind.speed} m/s</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Feels</span>
            <span>{Math.round(data.main.feels_like)}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
