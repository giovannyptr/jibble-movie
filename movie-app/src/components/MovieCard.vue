<script setup lang="ts">
import type { Movie } from '../types'
import { useMovieStore } from '../stores/movies'

const props = defineProps<{ movie: Movie }>()
const store = useMovieStore()
</script>

<template>
  <article class="card">
    <header class="header">
      <h3 class="title">{{ props.movie.Title }}</h3>
      <span class="year">{{ props.movie.Year }}</span>
    </header>

    <p class="imdb-id">IMDB ID: {{ props.movie.imdbID }}</p>

    <footer class="footer">
      <button
        class="fav-button"
        :class="{ active: store.isFavorite(props.movie.imdbID) }"
        @click="store.toggleFavorite(props.movie)"
        :aria-pressed="store.isFavorite(props.movie.imdbID)"
      >
        ★
      </button>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.card {
  background: #161B22; /* dark tech card base */
  color: #E6EDF3; /* soft white text */
  border-radius: 10px;
  padding: 1rem 1.2rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35); /* deep shadow for depth */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #1E242E; /* hover slightly brighter */
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25); /* blue glow hover */
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .title {
      font-weight: 600;
      font-size: 1.1rem;
      margin: 0;
      color: #3B82F6; /* primary electric blue */
      flex: 1;
      padding-right: 0.5rem;
    }

    .year {
      font-size: 0.9rem;
      color: #7D8590; /* muted gray-blue */
    }
  }

  .imdb-id {
    font-size: 0.85rem;
    color: #7D8590;
    margin-top: 0.4rem;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8rem;

    .fav-button {
      background: none;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      color: #475569; /* neutral gray */
      transition: color 0.2s ease, transform 0.2s ease;

      &.active {
        color: #10B981; /* neon green accent */
        text-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
      }

      &:hover {
        color: #60A5FA; /* glowing blue hover */
        transform: scale(1.1);
      }
    }
  }
}


</style>
