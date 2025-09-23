/**
 * Map OpenWeatherMap weather condition codes to Meteocons animated icons.
 * Uses "fill/animated" version from Meteocons.
 * If no match is found, falls back to OpenWeatherMap's own icon URL.
 */

const customIconMap = {
  // Thunderstorm group (200-232)
  200: "/icons/weather/thunderstorms-rain.svg",
  201: "/icons/weather/thunderstorms-rain.svg",
  202: "/icons/weather/thunderstorms-extreme-rain.svg",
  210: "/icons/weather/thunderstorms.svg",
  211: "/icons/weather/thunderstorms.svg",
  212: "/icons/weather/thunderstorms-extreme.svg",
  221: "/icons/weather/thunderstorms-extreme.svg",
  230: "/icons/weather/thunderstorms.svg",
  231: "/icons/weather/thunderstorms.svg",
  232: "/icons/weather/thunderstorms-extreme-rain.svg",

  // Drizzle group (300-321)
  300: "/icons/weather/drizzle.svg",
  301: "/icons/weather/drizzle.svg",
  302: "/icons/weather/drizzle.svg",
  310: "/icons/weather/drizzle.svg",
  311: "/icons/weather/drizzle.svg",
  312: "/icons/weather/drizzle.svg",
  313: "/icons/weather/drizzle.svg",
  314: "/icons/weather/drizzle.svg",
  321: "/icons/weather/drizzle.svg",

  // Rain group (500-531)
  500: "/icons/weather/rain.svg",
  501: "/icons/weather/rain.svg",
  502: "/icons/weather/rain.svg",
  503: "/icons/weather/extreme-rain.svg",
  504: "/icons/weather/extreme-rain.svg",
  511: "/icons/weather/snow.svg",
  520: "/icons/weather/rain.svg",
  521: "/icons/weather/rain.svg",
  522: "/icons/weather/extreme-rain.svg",
  531: "/icons/weather/extreme-rain.svg",

  // Snow group (600-622)
  600: "/icons/weather/snow.svg",
  601: "/icons/weather/snow.svg",
  602: "/icons/weather/extreme-snow.svg",
  611: "/icons/weather/sleet.svg",
  612: "/icons/weather/sleet.svg",
  613: "/icons/weather/sleet.svg",
  615: "/icons/weather/sleet.svg",
  616: "/icons/weather/sleet.svg",
  620: "/icons/weather/snow.svg",
  621: "/icons/weather/snow.svg",
  622: "/icons/weather/extreme-snow.svg",

  // Atmosphere group (701-781)
  701: "/icons/weather/mist.svg",
  711: "/icons/weather/smoke.svg",
  721: "/icons/weather/haze.svg",
  731: "/icons/weather/dust.svg",
  741: "/icons/weather/fog.svg",
  751: "/icons/weather/dust.svg",
  761: "/icons/weather/dust.svg",
  762: "/icons/weather/dust.svg",
  771: "/icons/weather/wind.svg",
  781: "/icons/weather/tornado.svg",

  // Clear & Clouds (800-804)
  800: "/icons/weather/clear-day.svg",
  801: "/icons/weather/partly-cloudy-day.svg",
  802: "/icons/weather/partly-cloudy-day.svg",
  803: "/icons/weather/overcast-day.svg",
  804: "/icons/weather/overcast-day.svg",
};

/**
 * Returns custom Meteocons icon path or OpenWeatherMap fallback.
 * @param {Object} weatherObj - e.g. data.weather[0]
 * @returns {string} icon URL or file path
 */
export function getIconSrc(weatherObj) {
  if (!weatherObj) return null;
  const { id, icon: owIconCode } = weatherObj;

  return customIconMap[id]
    ? customIconMap[id]
    : `https://openweathermap.org/img/wn/${owIconCode}@2x.png`;
}
