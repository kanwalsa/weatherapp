// src/stores/weatherCodes.ts
import { defineStore } from 'pinia'

export const useWeatherCodesStore = defineStore('weatherCodes', {
  state: () => ({
    codes: {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Drizzle: light',
      53: 'Drizzle: moderate',
      55: 'Drizzle: dense',
      61: 'Rain: slight',
      63: 'Rain: moderate',
      65: 'Rain: heavy',
      71: 'Snow: slight',
      73: 'Snow: moderate',
      75: 'Snow: heavy',
      80: 'Rain showers: slight',
      81: 'Rain showers: moderate',
      82: 'Rain showers: violent',
    } as Record<number, string>,
  }),
  getters: {
    getDescription: (state) => {
      return (code: number) => state.codes[code] || 'Unknown'
    },
    getIcon: () => {
      return (code: number) => {
        if ([0, 1].includes(code)) return 'mdi-weather-sunny'
        if ([2, 3].includes(code)) return 'mdi-weather-partly-cloudy'
        if ([45, 48].includes(code)) return 'mdi-weather-fog'
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'mdi-weather-rainy'
        if ([71, 73, 75].includes(code)) return 'mdi-weather-snowy'
        return 'mdi-weather-cloudy'
      }
    },
  },
})
