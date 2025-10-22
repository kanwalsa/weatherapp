<template>
  <v-container class="pa-4" max-width="400">
    <v-autocomplete
      v-model="selectedCity"
      :items="suggestions"
      item-title="label"
      item-value="value"
      label="City"
      hide-details
      dense
      class="clean-autocomplete"
      :loading="loading"
      @update:model-value="onSelect"
      @update:search="onSearch"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getCities } from '../services/geocode'
import axios from 'axios'

const emit = defineEmits(['update:modelValue'])

const suggestions = ref<{ label: string; value: any }[]>([])
const loading = ref(false)
const selectedCity = ref(null)
let searchTimeout: number | undefined

async function onSearch(search: string) {
  if (!search || search.length < 2) {
    suggestions.value = []
    return
  }
  clearTimeout(searchTimeout) // cancels the previously scheduled fetch if it hasn't fired yet
  searchTimeout = window.setTimeout(async () => {
    loading.value = true
    try {
      suggestions.value = await getCities(search)
    } catch (err) {
      console.error('Error fetching suggested cities', err)
      suggestions.value = []
    } finally {
      loading.value = false
    }
  }, 300) // debounce 300ms
}

function onSelect(city: any) {
  if (city) {
    emit('update:modelValue', city) // store full object
  }
}
</script>

<style scoped>
.clean-autocomplete {
  color: var(--acent-color) !important;
}
</style>
