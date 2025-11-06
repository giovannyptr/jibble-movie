<script setup lang="ts">
import { useMovieStore } from '../stores/movies'
import { ref } from 'vue'

const store = useMovieStore()
const q = ref(store.title)

function onSubmit() {
  store.search(q.value, 1)
}
</script>

<template>
  <form @submit.prevent="onSubmit" style="display:flex;gap:8px;margin:12px 0 16px">
    <input class="input" v-model="q" placeholder="Search movies by title…" />
    <button class="button" type="submit" :disabled="store.loading">Search</button>
  </form>
</template>
