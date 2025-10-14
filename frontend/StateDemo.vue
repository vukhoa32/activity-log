<!-- filepath: c:\Users\Admin\code\activity-log\frontend\StateDemo.vue -->
<template>
  <div>
    <h2>Vue State Demo</h2>
    <p>Count (ref): {{ count }}</p>
    <button @click="increment">Increment</button>
    <p>Count (reactive): {{ state.count }}</p>
    <button @click="incrementReactive">Increment Reactive</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const count = ref<number>(0)

interface State {
  count: number
}
const state = reactive<State>({ count: 0 })

function increment(): void {
  count.value++
}

function incrementReactive(): void {
  state.count++
}
</script>

<style>
/* Add styles here if needed */
</style>