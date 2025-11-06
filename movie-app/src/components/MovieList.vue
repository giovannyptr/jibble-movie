<!-- src/components/MovieList.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '../stores/movies.ts'
import MovieCard from './MovieCard.vue'

const store = useMovieStore()

onMounted(() => {
  // Initial fetch; empty query returns something reasonable from the mock API
  if (!store.items.length) {
    void store.search('', 1)
  }
})

function retry() {
  void store.search()
}
</script>

<template>
  <section aria-labelledby="results-heading">
    <h2 id="results-heading" style="position:absolute; left:-10000px">Results</h2>

    <!-- Error state -->
    <div v-if="store.error" class="card" style="border-color:#f87171; color:#fecaca">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px">
        <span>{{ store.error }}</span>
        <button class="button" @click="retry">Retry</button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else-if="store.loading" class="card">Loading…</div>

    <!-- Empty state -->
    <div v-else-if="!store.items.length" class="card" style="text-align:center; color:#9bb0d3">
      No poster-ready titles on this page.
      <div style="margin-top:10px; display:flex; gap:8px; justify-content:center">
        <button class="button" :disabled="store.page <= 1" @click="store.prev">← Prev</button>
        <button class="button" :disabled="store.page >= store.totalPages" @click="store.next">Next →</button>
      </div>
    </div>

    <!-- Results grid -->
    <div v-else class="row" aria-live="polite">
      <MovieCard v-for="m in store.items" :key="m.imdbID" :movie="m" />
    </div>

    <!-- Pagination -->
    <nav class="pagination" aria-label="Pagination">
      <button class="button" :disabled="store.page <= 1" @click="store.prev">Prev</button>
      <span class="badge">Page {{ store.page }} / {{ store.totalPages }}</span>
      <button class="button" :disabled="store.page >= store.totalPages" @click="store.next">Next</button>
    </nav>
  </section>
</template>

<style scoped>
/* Optional: ensure the grid has some top spacing from the search bar if needed */
</style>
