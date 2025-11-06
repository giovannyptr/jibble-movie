<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'
import MovieCard from './MovieCard.vue'

const store = useMovieStore()

onMounted(() => {
  if (!store.items.length) void store.search('', 1)
})
</script>

<template>
  <section aria-labelledby="results-heading">
    <h2 id="results-heading" style="position:absolute; left:-10000px">Results</h2>

    <div v-if="store.error" class="card" style="border-color:#f87171; color:#fecaca">
      {{ store.error }}
    </div>

    <div v-else-if="store.loading" class="card">Loading…</div>

    <div v-else-if="!store.items.length" class="card" style="text-align:center; color:#9bb0d3">
      No results with posters. Try another search.
    </div>

    <div v-else class="row" aria-live="polite">
      <MovieCard v-for="m in store.items" :key="m.imdbID" :movie="m" />
    </div>

    <nav class="pagination" aria-label="Pagination">
      <button class="button" :disabled="store.page <= 1" @click="store.prev">Prev</button>
      <span class="badge">Page {{ store.page }} / {{ store.totalPages }}</span>
      <button class="button" :disabled="store.page >= store.totalPages" @click="store.next">Next</button>
    </nav>
  </section>
</template>
