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
import MoviePreview from '@/components/MoviePreview.vue';
import MovieTopList from '@/components/MovieTopList.vue';
import { useMovieRandomStore } from '@/stores/movieStore';
import DataLoader from '@/UI/DataLoader.vue';

import { onMounted } from 'vue';

const randomMovieStore = useMovieRandomStore();

onMounted(() => {
  randomMovieStore.loadRandomMovie();
});
</script>

<style scoped></style>
