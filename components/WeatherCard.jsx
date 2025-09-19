export default function WeatherCard() {
  return (
    <div className="flex justify-center items-center mt-50">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-6 w-[90%] sm:w-96 border border-white/30 text-white">
        {/* City and date */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">London</h2>
          <p className="text-sm opacity-80">Friday, September 19</p>
        </div>

        {/* Temperature and icon */}
        <div className="flex flex-col items-center pt">
          <span className="text-6xl font-bold">22°C</span>
          <img
            src="https://openweathermap.org/img/wn/04d@2x.png"
            alt="Cloudy"
            className="w-20 h-20"
          />
          <p className="text-lg mt-2">Cloudy</p>
        </div>

        {/* Extra weather details */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
          <div className="flex flex-col">
            <span className="font-semibold">Humidity</span>
            <span>65%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Wind</span>
            <span>15 km/h</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Feels</span>
            <span>20°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
