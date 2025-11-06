<script setup lang="ts">
import type { Movie } from '../types'
import { useMovieStore } from '../stores/movies'

const { movie } = defineProps<{ movie: Movie }>()
const store = useMovieStore()

const fallbackUrl = `https://placehold.co/600x360?text=${encodeURIComponent(movie.Title)}`
function onImgError(e: Event) {
  const img = e.target as HTMLImageElement | null
  if (img) img.src = fallbackUrl
}
</script>

<template>
  <article class="card">
    <img
      :src="movie.Poster || fallbackUrl"
      alt=""
      style="width:100%;height:260px;object-fit:cover;border-radius:10px;margin-bottom:10px"
      loading="lazy"
      @error="onImgError"
    />
    <header style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h3 style="margin:0 0 4px">{{ movie.Title }}</h3>
        <span class="badge">{{ movie.Year }}</span>
      </div>
      <button
        class="button"
        :aria-pressed="store.isFavorite(movie.imdbID)"
        @click="store.toggleFavorite(movie)"
        title="Toggle favorite"
      >★</button>
    </header>

    <p style="margin:8px 0 0;color:#9bb0d3">
      <strong>IMDB:</strong> {{ movie.imdbID }}
      <span v-if="movie.imdbRating"> · <strong>Rating:</strong> {{ movie.imdbRating }}</span>
      <!-- <span v-if="movie.Runtime"> · <strong>Runtime:</strong> {{ movie.Runtime }}</span> -->
    </p>
    <!-- <p v-if="movie.Plot" style="margin:6px 0 0">{{ movie.Plot }}</p> -->
  </article>
</template>
