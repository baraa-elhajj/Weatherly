# Weatherly

A simple, responsive weather app built with **Next.js**, **React**, and **TailwindCSS**. It fetches real-time weather data from the **OpenWeatherMap API** and displays temperature and weather details in a clean, minimal card design.

---

## Features

- **City Search** – Search for any city worldwide + minimal suggestions
- **Real-Time Weather** – Shows temperature, weather condition, humidity, wind, and feels-like
- **Modern UI** – Built with TailwindCSS, featuring smooth hover effects and rounded cards
- **Fast & Lightweight** – Powered by Next.js for optimal performance

---

## Project Structure

```
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── SearchBar.jsx
│   └── WeatherCard.jsx
├── public/
│   └── background.jpg
├── utils/
│   ├── dateFormatter.js
│   └── stringFormatter.js
├── .env (auto-hidden)
├── README.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) + [React Hot Toast](https://react-hot-toast.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) + Cool [Meteocons](https://basmilius.github.io/weather-icons/) weather icons.
- **API:** [Axios](https://axios-http.com/docs/intro) promise API and [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data.

---

## Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/baraa-elhajj/Weatherly.git
cd weatherly
npm install
```

2. Create a `.env.local` file in the project root and add your OpenWeatherMap API key:

```bash
NEXT_PUBLIC_WEATHER_KEY=your_api_key_here
```

3. Run the app:

```bash
npm run dev
```

then go to http://localhost:3000

---

## Preview

| Desktop                                                                   | Mobile                                                                  |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| ![Desktop Screenshot](./public/screenshots/weatherly-desktop-preview.png) | ![Mobile Screenshot](./public/screenshots/weatherly-mobile-preview.png) |

---

## Live Demo

Deployed on Vercel: https://weatherly-lb.vercel.app/

---

## Contribution

Feel free to fork this project or suggest improvements if you find something cool!
