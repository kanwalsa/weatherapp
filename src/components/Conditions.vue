<template>

  <div v-if="weather" class="weather-conditions">

    <div class="condition">
      <v-icon color="var(--accent-color)" size="28">mdi-clock-time-four-outline</v-icon>
      <div class="value">{{ requestTime }}</div>
      <div class="label">Retreival Time</div>
    </div>

    <div class="condition">
      <v-icon color="var(--acent-color)" size="28">mdi-thermometer</v-icon>
      <div class="value">{{ weather.temp }}°C</div>
      <div class="label">Temp</div>
    </div>

    <div class="condition">
      <v-icon :icon="weatherCodesStore.getIcon(weather.code)" color="var(--acent-color)" size="28">
      </v-icon>
      <div class="value">{{ weather.description }}</div>
      <div class="label">Conditions</div>
    </div>

    <div class="condition">
      <v-icon color="var(--acent-color)" size="28">mdi-weather-windy</v-icon>
      <div class="value">{{ weather.wind }} km/h</div>
      <div class="label">Wind</div>
    </div>

    <div class="condition">
      <v-icon color="var(--acent-color)" size="28">mdi-water-percent</v-icon>
      <div class="value">{{ weather.humidity }}%</div>
      <div class="label">Humidity</div>
    </div>
  </div>

  <div v-if="loading">
    <v-progress-circular
      indeterminate
      color="var(--acent-color)"
      size="40"
      width="4"
      class="loading-spinner"
    ></v-progress-circular>
  </div>
  <p v-else-if="error" class="error">{{ error }}</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWeatherCodesStore } from '../stores/weatherCodes'
import { fetchConditions } from '../services/weather'

const requestTime = ref<string>('')
const weatherCodesStore = useWeatherCodesStore()
interface City {
  name?: string
  lat: number
  lon: number
}

// Accept a City object
const props = defineProps<{ city: City }>()

const weather = ref<any>(null)
const loading = ref(false)
const error = ref('')

watch(
  () => props.city,
  async (newCity) => {
    if (!newCity) return

    loading.value = true
    error.value = ''
    weather.value = null

    try {
      weather.value = await fetchConditions(newCity.lat, newCity.lon)
      requestTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch (err: any) {
      error.value = err.message || 'Error fetching current conditions'
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.v-icon {
  color: var(--accent-color) !important;
}
.weather-conditions {
  overflow-x: auto;
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 1rem 2rem;
  text-align: center;
  color: var(--accent-color);
  flex-wrap: wrap;
}
.loading-spinner {
  margin: 2rem auto;
  display: block;
}
</style>
