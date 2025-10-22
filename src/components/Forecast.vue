<template>
  <div v-if="forecast.length" class="forecast-grid">
    <v-card v-for="(day, i) in forecast" :key="i" class="forecast-card">
      <v-icon :icon="weatherCodesStore.getIcon(day.code)" color="" size="36" />
      <div class="day">{{ formatDay(day.date) }}</div>
      <div class="condition">{{ day.condition }}</div>
      <div class="temps">
        <span class="high">{{ Math.round(day.max) }}°</span> /
        <span class="low">{{ Math.round(day.min) }}°</span>
      </div>
    </v-card>
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
  <p v-else-if="error">{{ error }}</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWeatherCodesStore } from '../stores/weatherCodes'
import { fetchForecast } from '../services/weather'
interface City {
  name?: string
  lat: number
  lon: number
}

// Accept a City object
const props = defineProps<{ city: City }>()
const weatherCodesStore = useWeatherCodesStore()

const forecast = ref<{ date: string; max: number; min: number; description: string }[]>([])
const loading = ref(false)
const error = ref('')

watch(
  () => props.city,
  async (newCity) => {
    if (!newCity) return
    loading.value = true
    error.value = ''
    forecast.value = []

    try {
      forecast.value = await fetchForecast(newCity.lat, newCity.lon)
    } catch (err: any) {
      error.value = err.message || 'Error fetching forecast'
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)

// Helpers
const formatDay = (date: string) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
</script>

<style scoped>
.forecast-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  gap: 1rem 1rem;
  margin-top: 1rem;
  overflow-x: auto;
}

.forecast-card {
  flex: 1 1 100px; /* Each card takes up equal width (5 per row) */
  max-width: 150px;
  min-width: 150px; /* keep cards consistent */
  min-height: 100px;
  text-align: center;
  border-radius: 1rem;
  padding: 1rem 0.75rem; /* more internal padding */
  background-color: var(--page-bg-color);
  padding: 0.75rem;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  margin: 2rem auto;
  display: block;
}
</style>
