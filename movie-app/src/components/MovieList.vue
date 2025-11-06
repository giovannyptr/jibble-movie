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
  <section>
    <div v-if="store.loading" class="loading">Loading…</div>
    <div v-else-if="!store.items.length" class="empty">No results</div>

    <div v-else class="movie-list">
      <MovieCard
        v-for="movie in store.items"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>

    <nav class="pagination">
      <button class="button" :disabled="store.page <= 1" @click="store.prev">
        Prev
      </button>
      <span class="page">Page {{ store.page }} / {{ store.totalPages }}</span>
      <button class="button" :disabled="store.page >= store.totalPages" @click="store.next">
        Next
      </button>
    </nav>
  </section>
</template>

<style scoped>
.movie-list {
  display: flex;
  flex-direction: column; /* stack vertically */
  gap: 1rem; /* space between each card */
  padding: 1rem 0;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2rem;
}
.button {
  background: #2b2f3a;
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.button:hover:not(:disabled) {
  background: #404659;
}
.button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page {
  font-size: 0.9rem;
  color: #ccc;
}
</style>

