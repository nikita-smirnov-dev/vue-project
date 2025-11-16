<template>
  <template v-if="isInitialLoading">
    <PageLoader />
  </template>
  <template v-else-if="movieDetailsStore.error">
    <ErrorMessage
      :message="movieDetailsStore.error"
      :onRetry="() => movieDetailsStore.loadMovieDetails(movieId)"
    />
  </template>
  <template v-else>
    <section>
      <MoviePreview
        v-if="movieDetailsStore.detailsMovie"
        :movie="movieDetailsStore.detailsMovie"
        :is-details="true"
      />
    </section>
    <section>
      <AboutMovie
        v-if="movieDetailsStore.detailsMovie"
        :movie="movieDetailsStore.detailsMovie"
      />
    </section>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';

import AboutMovie from '@/components/AboutMovie.vue';
import MoviePreview from '@/components/MoviePreview.vue';
import { useMovieDetailsStore } from '@/stores/movieStore/movieDetailsStore';
import PageLoader from '@/UI/PageLoader.vue';
import ErrorMessage from '@/UI/ErrorMessage.vue';

const route = useRoute();
const movieDetailsStore = useMovieDetailsStore();
const movieId = Number(route.params.id || 0);

const isInitialLoading = computed(() => {
  return movieDetailsStore.loader && !movieDetailsStore.detailsMovie;
});

onMounted(() => {
  movieDetailsStore.loadMovieDetails(movieId);
});
</script>

<style scoped></style>
