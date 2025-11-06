<script setup lang="ts">
import MovieSearch from './components/MovieSearch.vue';
import MovieList from './components/MovieList.vue'
import Favorites from './components/Favorites.vue'
</script>


<template>
<div class="container">
<h1>🎬 Movie Finder by giovannyptr</h1>
<MovieSearch />
<MovieList />
<Favorites />
</div>
</template>