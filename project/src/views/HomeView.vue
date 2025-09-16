<template>
  <MoviePreview
    v-if="randomMovieStore.movieRandom"
    :movie="randomMovieStore.movieRandom"
  />

  <p v-else-if="randomMovieStore.error" class="base-text">
    {{ randomMovieStore.error }}
  </p>

  <DataLoader v-else-if="randomMovieStore.loader" />

  <MovieTopList />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import MoviePreview from '@/components/MoviePreview.vue';
import MovieTopList from '@/components/MovieTopList.vue';
import { useMovieRandomStore } from '@/stores/movieRandomStore';
import DataLoader from '@/UI/DataLoader.vue';

const randomMovieStore = useMovieRandomStore();

onMounted(() => {
  if (!randomMovieStore.movieRandom) {
    randomMovieStore.loadRandomMovie();
  }
});
</script>

<style scoped></style>
