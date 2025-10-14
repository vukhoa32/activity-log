<!-- filepath: c:\Users\Admin\code\activity-log\frontend\HelloWorld.vue -->
<template>
  <button @click="fetchHello">Call Backend</button>
  <div v-if="response">Response: {{ response }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const response = ref<string | null>(null)

async function fetchHello() {
  try {
    const res = await fetch('http://127.0.0.1:5001/activity-log-khoavu/us-central1/helloWorld')
    response.value = await res.text()
  } catch (err) {
    response.value = 'Error: ' + (err instanceof Error ? err.message : String(err))
  }
}
</script>

<style>
/* Add styles here if needed */
</style>