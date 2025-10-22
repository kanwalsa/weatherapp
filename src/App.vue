<template>
  <div class="flex flex-col h-full">
    <h2 class="text-center" style="color: var(--accent-color)">Simple Weather App</h2>
    <SearchBar v-model="selectedCity" />
    <Conditions v-if="selectedCity" :city="selectedCity" />
    <Forecast v-if="selectedCity" :city="selectedCity" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SearchBar from './components/SearchBar.vue'
import Conditions from './components/Conditions.vue'
import Forecast from './components/Forecast.vue'

interface City {
  name?: string
  lat: number
  lon: number
}

const selectedCity = ref<City | null>(null)
</script>
