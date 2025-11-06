<script setup lang="ts">
import { useMovieStore } from '../stores/movies'
import MovieCard from './MovieCard.vue'
const store = useMovieStore()
</script>


<template>
<section style="margin-top:24px">
<h2>⭐ Favorites</h2>
<p v-if="!store.favoriteList.length" style="color:#9bb0d3">No favorites yet.</p>
<div class="row">
<MovieCard v-for="m in store.favoriteList" :key="m.imdbID" :movie="m" />
</div>
</section>
</template>