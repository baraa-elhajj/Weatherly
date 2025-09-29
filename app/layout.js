import { Varela_Round } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { WeatherProvider } from "@/contexts/WeatherContext";

const varela_round = Varela_Round({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Weatherly",
  description: "Get instant weather updates and forecasts at a glance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={varela_round.className}>
        <WeatherProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </WeatherProvider>
      </body>
    </html>
  );
}
