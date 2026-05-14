import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useTheme } from "../hooks/useTheme";

const weatherEmoji : Record<number, string> = {
    0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️", 51: "🌦️", 61: "🌧️",
  71: "🌨️", 80: "🌦️", 95: "⛈️",
}

export default function WatherWidget() {
    const {darkMode} = useTheme()
    const [input, setInput] = useState("")
    const [city, setCity] = useState("Bangkok")

    const {weather, loading, error} = useWeather(city)

    return (
        <div className={`
            p-5
            rounded-2xl
            shadow-sm
            mb-6
            transition-all
            duration-300
            ${
                darkMode
                    ? "bg-gray-900 border border-gray-800"
                    : "bg-white border border-gray-200"
            }`}>
                <h2 className={`text-xl font-bold mb-3`}>🌍 Weather</h2>

                <div className="flex gap-2 mb-4">
                    <input 
                        type="text"
                        placeholder="Enter city name..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && setCity(input)}
                        className={`
                            border
                            p-2
                            rounded-xl
                            w-full
                            outline-none
                            transition-all
                            ${
                                darkMode
                                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                                    : "bg-gray-50 border-gray-300"
                            }`}
                    />
                    <button
                        onClick={() => setCity(input)}
                        className="px-4 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"   
                    >
                        Search
                    </button>
                </div>

                {loading && <p className="text-gray-400 animate-pulse">Loading weather...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {weather && !loading && (
                    <div className="flex items-center gap-4">
                        <span className="text-5xl">
                            {weatherEmoji[weather.weathercode] ?? "🌡️"}
                        </span>
                        <div>
                            <p className="text-3xl font-bold">{weather.temperature}°C</p>
                            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                wind : {weather.windspeed} km/h · {city}
                            </p>
                        </div>
                    </div>
                )}
        </div>
    )
}