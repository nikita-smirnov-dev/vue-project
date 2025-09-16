<template>
  <MoviePreview
    v-if="randomMovieStore.movieRandom"
    :movie="randomMovieStore.movieRandom"
  />
  <DataLoader v-else-if="randomMovieStore.loader" />

  <p v-else-if="randomMovieStore.error" class="base-text">
    {{ randomMovieStore.error }}
  </p>

  <DataLoader v-if="movieTopStore.loader" />

  <p v-else-if="movieTopStore.error" class="base-text">
    {{ movieTopStore.error }}
  </p>

  <MovieTopList
    v-else-if="movieTopStore.movieTop"
    :movie="movieTopStore.movieTop"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import MoviePreview from '@/components/MoviePreview.vue';
import MovieTopList from '@/components/MovieTopList.vue';
import { useMovieRandomStore } from '@/stores/movieRandomStore';
import DataLoader from '@/UI/DataLoader.vue';
import { useMovieTopStore } from '@/stores/movieTopStore';

const randomMovieStore = useMovieRandomStore();
const movieTopStore = useMovieTopStore();

onMounted(() => {
  if (!randomMovieStore.movieRandom) {
    randomMovieStore.loadRandomMovie();
  }

  if (!movieTopStore.movieTop) {
    movieTopStore.loadTopMovie();
  }
});
</script>

<style scoped></style>
