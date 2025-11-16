<template>
  <template v-if="isInitialLoading">
    <PageLoader />
  </template>
  <template v-else>
    <section>
      <template v-if="randomMovieStore.movieRandom">
        <MoviePreview :movie="randomMovieStore.movieRandom" />
      </template>
      <template v-else-if="randomMovieStore.loader"> <DataLoader /> </template>
      <template v-else-if="randomMovieStore.error">
        <ErrorMessage
          :message="randomMovieStore.error"
          :onRetry="randomMovieStore.loadRandomMovie"
        />
      </template>
    </section>
    <section>
      <template v-if="movieTopStore.loader"> <DataLoader /> </template>
      <template v-else-if="movieTopStore.error">
        <ErrorMessage
          :message="movieTopStore.error"
          :onRetry="movieTopStore.loadTopMovie"
        />
      </template>
      <template v-else-if="movieTopStore.movieTop">
        <MovieTopList :movie="movieTopStore.movieTop" />
      </template>
    </section>
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import MoviePreview from '@/components/MoviePreview.vue';
import MovieTopList from '@/components/MovieTopList.vue';
import { useMovieRandomStore } from '@/stores/movieStore/movieRandomStore';
import DataLoader from '@/UI/DataLoader.vue';
import { useMovieTopStore } from '@/stores/movieStore/movieTopStore';
import ErrorMessage from '@/UI/ErrorMessage.vue';
import PageLoader from '@/UI/PageLoader.vue';

const randomMovieStore = useMovieRandomStore();
const movieTopStore = useMovieTopStore();

const isInitialLoading = computed(() => {
  return (
    randomMovieStore.loader &&
    movieTopStore.loader &&
    !randomMovieStore.movieRandom &&
    !movieTopStore.movieTop
  );
});

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
