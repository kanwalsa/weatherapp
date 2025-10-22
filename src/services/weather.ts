import { useWeatherCodesStore } from '@/stores/weatherCodes'

export async function fetchConditions(lat: number, long: number) {
  const weatherCodesStore = useWeatherCodesStore()

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
  )
  const data = await res.json()
  const weather = data.current_weather

  return {
    temp: weather.temperature,
    wind: weather.windspeed,
    code: weather.weathercode,
    description: weatherCodesStore.getDescription(weather.weathercode),
    humidity: weather.relativehumidity ?? 'N/A',
  }
}

export async function fetchForecast(lat: number, long: number) {
  const weatherCodesStore = useWeatherCodesStore()

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
  )

  const data = await res.json()
  const weather = data.daily

  const forecast = weather.time.slice(0, 5).map((date: string, i: number) => ({
    date,
    max: weather.temperature_2m_max[i],
    min: weather.temperature_2m_min[i],
    code: weather.weathercode[i],
    description: weatherCodesStore.getDescription(weather.weathercode[i]),
  }))

  return forecast
}
