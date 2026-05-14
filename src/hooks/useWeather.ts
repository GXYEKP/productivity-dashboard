import { useState, useEffect } from "react";
import type { WeatherData } from "../types/weather";

export const useWeather =  (city : string) => {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string |null>(null)

    useEffect(() => {
        if (!city) return

        const fetchWeather = async () => {
            setLoading(true)
            setError(null)
            try {
                const geoRes = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
                )
                const geoData = await geoRes.json()

                if (!geoData.results?.length) {
                    setError("City not found")
                    setWeather(null)
                    return
                }

                const {latitude, longitude} = geoData.results[0]

                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                )

                const weatherData = await weatherRes.json()
                setWeather(weatherData.current_weather)
            } catch {
                setError("Failed to fetch weather")
            } finally {
                setLoading(false)
            }
        }

        const timer = setTimeout(fetchWeather, 500)
        return () => clearTimeout(timer)
    },[city])

    return { weather, loading, error }
}